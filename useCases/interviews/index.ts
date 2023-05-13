import getClaims from '@/actions/auth/getClaims';
import extendArray from '@/actions/extendArray';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import { payload, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(
  z.object({
    companyId: z.string(),
    jobId: z.string().optional(),
    query: z.string().optional(),
  })
);

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const parts = payload(
  tineVar(input, ({ query }) =>
    query
      ? {
          OR: query
            .split(' ')
            .map(
              (part) =>
                [
                  {
                    interviewee: {
                      email: {
                        contains: part,
                        mode: 'insensitive',
                      },
                    },
                  },
                  {
                    interviewee: {
                      firstName: {
                        contains: part,
                        mode: 'insensitive',
                      },
                    },
                  },
                  {
                    interviewee: {
                      lastName: {
                        contains: part,
                        mode: 'insensitive',
                      },
                    },
                  },
                ] as const
            )
            .flat(),
        }
      : undefined
  )
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
  include: {
    job: {
      include: {
        company: true,
      },
    },
    interviewee: true,
    rates: true,
  },
});

const interviews = extendArray([
  tineVar(data),
  (item) => ({
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
      presignedGet({
        bucketName: 'interview-thumbnails',
        objectName: `${item.id}.mp4`,
        expires: 3600,
      })
    ),
  }),
]);

export default interviews.withInput(input);
