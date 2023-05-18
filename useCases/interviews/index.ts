import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { payload, tineInput, tineVar } from 'tinejs';

import { getQueryParams } from './interview-functions';

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
    thumbnail: true,
    interviewee: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
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
    }))
  )
);

export default interviews.withInput(input);
