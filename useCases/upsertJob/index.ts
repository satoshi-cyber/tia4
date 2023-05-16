import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { upsertJobSchema } from '@/types';
import { condition, tineInput, tineVar } from 'tinejs';

const input = tineInput(
  z.intersection(upsertJobSchema, z.object({ companyId: z.string() }))
);

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const updateJob = prisma.job.update({
  where: {
    companyId: tineVar(claims, 'companyId'),
    id: tineVar(input, 'id'),
  },
  data: {
    title: tineVar(input, 'title'),
    deadline: tineVar(input, 'deadline'),
    description: tineVar(input, 'description'),
    questions: tineVar(input, 'questions'),
  },
  select: {
    id: true,
  },
});

const createJob = prisma.job.create({
  data: {
    company: {
      connect: {
        id: tineVar(claims, 'companyId'),
      },
    },
    title: tineVar(input, 'title'),
    deadline: tineVar(input, 'deadline'),
    description: tineVar(input, 'description'),
    questions: tineVar(input, 'questions'),
  },
  select: {
    id: true,
  },
});

const upsertJob = condition([
  tineVar(input, ({ id }) => Boolean(id)),
  tineVar(updateJob),
  tineVar(createJob),
]);

export default upsertJob.withInput(input);
