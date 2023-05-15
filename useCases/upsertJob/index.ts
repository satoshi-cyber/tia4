import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { questionSchema } from '@/types';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(
  z.object({
    id: z.string().optional(),
    companyId: z.string(),
    title: z.string(),
    deadline: z.string(),
    description: z.string().optional().nullable(),
    questions: z.array(questionSchema),
  })
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
