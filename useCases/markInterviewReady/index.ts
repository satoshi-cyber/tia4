import { z } from 'zod';
import { payload, tineFn, tineInput, tineVar } from 'tinejs';
import { InterviewStatus } from '@prisma/client/edge';
import prisma from '@/actions/prisma';
import s3 from '@/actions/s3';
import sendMail from '@/actions/sendMail';
import { env } from '@/actions/config';
import { AuthError } from '@/types';

const input = tineInput(
  z.object({
    id: z.string(),
    secret: z.string(),
  })
);

const markInterviewReady = payload(
  tineFn(async (ctx) => {
    // write better helper for this
    const checkSecret = await payload(tineVar(input, 'secret')).run(ctx);

    if (checkSecret !== env.CONVERTER_SECRET) {
      throw new AuthError('Invalid secret');
    }

    const interview = await prisma.interview
      .update({
        where: {
          id: tineVar(input, 'id'),
        },
        data: {
          status: InterviewStatus.ready,
        },
        include: {
          job: true,
          interviewee: true,
        },
      })
      .run(ctx);

    const companyId = interview.job.companyId;

    const members = await prisma.companyMember
      .findMany({
        where: { companyId },
        include: {
          user: true,
        },
      })
      .run(ctx);

    const ratesData = members.map((member) => ({
      raterId: member.userId,
      interviewId: interview.id,
    }));

    await prisma.rate
      .createMany({
        data: ratesData,
      })
      .run(ctx);

    const avatar = await s3
      .presignedGet({
        bucketName: 'user-avatars',
        objectName: `${interview.intervieweeId}.jpg`,
        expires: 604800,
      })
      .run(ctx);

    const promises = await members.map((member) =>
      sendMail({
        template: 'Rate',
        to: member.user.email,
        props: {
          interviewId: interview.id,
          jobTitle: interview.job.title,
          candidate: {
            fullName: `${interview.interviewee.firstName} ${interview.interviewee.lastName}`,
            bio: interview.interviewee.bio ?? '',
            avatar,
          },
        },
      }).run(ctx)
    );

    await Promise.all(promises);

    return true;
  })
);

export default markInterviewReady.withInput(input);
