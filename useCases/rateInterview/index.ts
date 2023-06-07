import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import s3 from '@/actions/s3';
import sendMail from '@/actions/sendMail';

export const MIN_SCORE = 0;

export const MAX_SCORE = 4;

const input = tineInput(
  z.object({
    interviewId: z.string(),
    value: z.number().min(MIN_SCORE).max(MAX_SCORE),
  })
);

const claims = auth.getClaims();

const rateInterview = task(async (ctx) => {
  const rate = await prisma.rate
    .update({
      where: {
        raterId_interviewId: {
          raterId: tineVar(claims, 'userId'),
          interviewId: tineVar(input, 'interviewId'),
        },
      },
      data: {
        value: tineVar(input, 'value'),
      },
      include: {
        interview: {
          include: {
            job: true,
            interviewee: true,
          },
        },
      },
    })
    .run(ctx);

  const rates = await prisma.rate
    .findMany({
      where: {
        interviewId: tineVar(input, 'interviewId'),
      },
      include: {
        rater: true,
      },
    })
    .run(ctx);

  const ratesLeft = rates.reduce((acc, rate) => {
    if (rate.value === null) {
      return acc + 1;
    }

    return acc;
  }, 0);

  if (ratesLeft === 0) {
    const totalValue = rates.reduce((acc, rate) => {
      return acc + (rate.value || 0);
    }, 0);

    const score = Math.round((totalValue / (rates.length * MAX_SCORE)) * 100);

    await prisma.interview
      .update({
        where: {
          id: tineVar(input, 'interviewId'),
        },
        data: {
          score,
        },
      })
      .run(ctx);

    const avatar = await s3
      .presignedGet({
        bucketName: 'user-avatars',
        objectName: `${rate.interview?.intervieweeId}.jpg`,
        expires: 604800,
      })
      .run(ctx);

    const ratersEmails = rates.map(({ rater }) => rater.email);

    if (score < 50) {
      const promises = ratersEmails.map((raterEmail) =>
        sendMail({
          template: 'CadidateDisqualified',
          to: raterEmail,
          props: {
            jobTitle: rate.interview?.job.title ?? '',
            score,
            candidate: {
              email: rate.interview?.interviewee.email ?? '',
              fullName: `${rate.interview?.interviewee.firstName} ${rate.interview?.interviewee.lastName}`,
              avatar,
            },
          },
        }).run(ctx)
      );

      await Promise.all(promises);

      return rate;
    }

    const resumeUrl = await s3
      .presignedGet({
        bucketName: 'user-resumes',
        objectName: `${rate.interview?.intervieweeId}.pdf`,
        expires: 604800,
      })
      .run(ctx);

    const promises = ratersEmails.map((raterEmail) =>
      sendMail({
        template: 'CadidateQualified',
        to: raterEmail,
        props: {
          jobTitle: rate.interview?.job.title ?? '',
          score,
          candidate: {
            resumeUrl: rate.interview?.interviewee.resumeFileName
              ? resumeUrl
              : undefined,
            email: rate.interview?.interviewee.email ?? '',
            fullName: `${rate.interview?.interviewee.firstName} ${rate.interview?.interviewee.lastName}`,
            avatar,
          },
        },
      }).run(ctx)
    );

    await Promise.all(promises);
  }

  return rate;
});

export default rateInterview.withInput(input);
