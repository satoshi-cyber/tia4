import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import { InterviewStatus } from '@prisma/client/edge';
import { payload, tineVar } from 'tinejs';

const claims = getClaims();

const data = prisma.interview.findMany({
  where: {
    intervieweeId: tineVar(claims, 'userId'),
  },
  orderBy: { createdAt: 'desc' },
  select: {
    id: true,
    createdAt: true,
    status: true,
    answers: true,
    job: {
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  },
});

const myInterviews = payload(
  tineVar(data, ($data) =>
    $data.map((item) => ({
      ...item,
      job: {
        ...item.job,
        company: {
          ...item.job.company,
          avatarUrl: tineVar(
            presignedGet({
              bucketName: 'company-avatars',
              objectName: `${item.job.company.id}.jpg`,
              expires: 3600,
            })
          ),
        },
      },
      thumbnail: tineVar(
        item.status === InterviewStatus.ready
          ? presignedGet({
              bucketName: 'interview-thumbnails',
              objectName: `${item.id}.mp4`,
              expires: 3600,
            })
          : presignedGet({
              bucketName: 'answers-original',
              objectName: `${item.id}-${item.answers[0].question.id}.mp4`,
              expires: 3600,
            })
      ),
    }))
  )
);

export default myInterviews.noInput();
