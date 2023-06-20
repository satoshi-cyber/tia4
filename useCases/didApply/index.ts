import { z } from 'zod';
import { condition, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ jobId: z.string() }));

const claims = auth.getClaims();

const count = prisma.interview.count({
  where: {
    jobId: tineVar(input, 'jobId'),
    intervieweeId: tineVar(claims, 'userId'),
  },
});

const didApply = condition({
  if: tineVar(count, ($count) => $count > 0),
  then: true,
  else: false,
});

export default didApply.withInput(input);
