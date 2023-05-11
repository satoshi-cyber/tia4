import prisma from '@/actions/prisma';
import { tineInput, tineVar } from 'tinejs';
import payload from 'tinejs.payload';
import { z } from 'zod';

const input = tineInput(z.object({ id: z.string() }));

const user = payload({ id: 'a4d78962-c38c-4d4c-879c-7ca4b28db656' });

const interview = prisma.interview.findUnique({
  where: {
    intervieweeId: tineVar(user, 'id'),
    id: tineVar(input, 'id'),
  },
  select: {
    id: true,
    intervieweeId: true,
  },
});

export default interview.withInput(input);