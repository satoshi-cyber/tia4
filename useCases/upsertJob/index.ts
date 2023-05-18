import { z } from 'zod';
import { condition, tineInput, tineVar } from 'tinejs';
import { upsertJobSchema } from '@/types';
import prisma from '@/actions/prisma';
import auth from '@/actions/auth';

const input = tineInput(
  z.intersection(upsertJobSchema, z.object({ companyId: z.string() }))
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

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
