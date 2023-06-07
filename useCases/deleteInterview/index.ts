import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ id: z.string() }));

const claims = auth.getClaims();

const deleteInterview = task(async (ctx) => {
  await prisma.rate
    .deleteMany({
      where: {
        interviewId: tineVar(input, 'id'),
        interview: { intervieweeId: tineVar(claims, 'userId') },
      },
    })
    .run(ctx);

  return prisma.interview
    .delete({
      where: {
        id: tineVar(input, 'id'),
        intervieweeId: tineVar(claims, 'userId'),
      },
    })
    .run(ctx);
});

export default deleteInterview.withInput(input);
