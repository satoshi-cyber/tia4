import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import prisma from '@/actions/prisma';
import auth from '@/actions/auth';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const jobs = prisma.job.findMany(
  {
    where: {
      companyId: tineVar(claims, 'companyId'),
    },
    select: {
      id: true,
      title: true,
      deadline: true,
    },
    orderBy: { createdAt: 'desc' },
  },
  { name: 'jobs' }
);

export default jobs.withInput(input);
