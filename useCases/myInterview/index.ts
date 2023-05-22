import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ id: z.string() }));

const claims = auth.getClaims();

const interview = prisma.interview.findUnique({
  where: {
    id: tineVar(input, 'id'),
    intervieweeId: tineVar(claims, 'userId'),
  },
  include: {
    job: {
      include: {
        company: true,
      },
    },
    interviewee: true,
  },
});

export default interview.withInput(input);
