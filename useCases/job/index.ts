import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ id: z.string(), companyId: z.string() }));

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const job = prisma.job.findUnique({
  where: {
    companyId: tineVar(claims, 'companyId'),
    id: tineVar(input, 'id'),
  },
  select: {
    id: true,
    title: true,
    deadline: true,
    description: true,
    questions: true,
  },
});

export default job.withInput(input);
