import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { upsertJobSchema } from '@/types';
import { tineInput, tineVar } from 'tinejs';

const input = tineInput(
  z.intersection(upsertJobSchema, z.object({ companyId: z.string() }))
);

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const upsertJob = prisma.job.upsert({
  where: {
    companyId: tineVar(claims, 'companyId'),
    id: tineVar(input, 'id'),
  },
  create: {
    company: {
      connect: {
        id: tineVar(input, 'companyId'),
      },
    },
    title: tineVar(input, 'title'),
    deadline: tineVar(input, 'deadline'),
    description: tineVar(input, 'description'),
    questions: tineVar(input, 'questions'),
  },
  update: {
    title: tineVar(input, 'title'),
    deadline: tineVar(input, 'deadline'),
    description: tineVar(input, 'description'),
    questions: tineVar(input, 'questions'),
  },
  select: {
    id: true,
  },
});

export default upsertJob.withInput(input);
