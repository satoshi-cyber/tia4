import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const jobs = prisma.job.findMany({
  where: {
    companyId: tineVar(claims, 'companyId'),
  },
  select: {
    id: true,
    title: true,
    deadline: true,
  },
  orderBy: { createdAt: 'desc' },
});

export default jobs.withInput(input);
