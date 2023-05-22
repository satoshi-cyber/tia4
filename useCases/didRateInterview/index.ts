import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ interviewId: z.string() }));

const claims = auth.getClaims();

const didRateInterview = prisma.rate.findUnique({
  where: {
    raterId_interviewId: {
      raterId: tineVar(claims, 'userId'),
      interviewId: tineVar(input, 'interviewId'),
    },
  },
});

export default didRateInterview.withInput(input);
