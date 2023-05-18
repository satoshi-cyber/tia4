import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import { payload, tineInput, tineVar } from 'tinejs';

import { getQueryParams } from './interview-functions';
import { InterviewStatus } from '@prisma/client/edge';

const input = tineInput(
  z.object({
    companyId: z.string(),
    jobId: z.string().optional(),
    query: z.string().optional(),
  })
);

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const parts = payload(
  tineVar(input, ({ query }) => (query ? getQueryParams(query) : undefined))
);

const data = prisma.interview.findMany({
  where: {
    job: {
      id: tineVar(input, 'jobId'),
      companyId: tineVar(claims, 'companyId'),
    },
    OR: tineVar(parts),
  },
  orderBy: {
    score: {
      sort: 'desc',
      nulls: 'first',
    },
  },
  select: {
    id: true,
    createdAt: true,
    score: true,
    status: true,
    answers: true,
    interviewee: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
    rates: {
      select: {
        value: true,
      },
    },
  },
});

const interviews = payload(
  tineVar(data, ($data) =>
    $data.map((item) => ({
      ...item,
      votesLeft: item.rates?.reduce((acc, rate) => {
        if (rate.value === null) {
          return acc + 1;
        }

        return acc;
      }, 0),
      interviewee: {
        ...item.interviewee,
        avatarUrl: tineVar(
          presignedGet({
            bucketName: 'user-avatars',
            objectName: `${item.interviewee.id}.jpg`,
            expires: 3600,
          })
        ),
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

export default interviews.withInput(input);
