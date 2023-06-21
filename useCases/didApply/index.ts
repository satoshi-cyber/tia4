import { z } from 'zod';
import { shape, tineInput, tineVar } from 'tinejs';
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

const didApply = shape(tineVar(count, ($count) => $count > 0));

export default didApply.withInput(input);
