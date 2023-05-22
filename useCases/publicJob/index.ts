import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ id: z.string() }));

const publicJob = prisma.job.findUnique(
  {
    where: {
      id: tineVar(input, 'id'),
    },
    select: {
      id: true,
      title: true,
      company: {
        select: {
          name: true,
          website: true,
          avatarUrl: true,
        },
      },
      description: true,
      questions: true,
    },
  },
  { name: 'publicJob' }
);

export default publicJob.withInput(input);
