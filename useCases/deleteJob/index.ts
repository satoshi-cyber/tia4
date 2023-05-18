import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ id: z.string(), companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const deleteJob = prisma.job.delete({
  where: {
    companyId: tineVar(claims, 'companyId'),
    id: tineVar(input, 'id'),
  },
  select: {
    id: true,
  },
});

export default deleteJob.withInput(input);
