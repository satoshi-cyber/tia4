import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import prisma from '@/actions/prisma';
import auth from '@/actions/auth';

const input = tineInput(
  z.object({
    companyId: z.string(),
  })
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const pendingRates = prisma.rate.findMany({
  where: {
    raterId: tineVar(claims, 'userId'),
    value: null,
    interview: {
      job: {
        companyId: tineVar(claims, 'companyId'),
      },
    },
  },
  include: {
    interview: {
      include: {
        job: {
          include: {
            company: true,
          },
        },
        interviewee: true,
        rates: true,
      },
    },
  },
});

export default pendingRates.withInput(input);
