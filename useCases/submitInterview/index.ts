import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(
  z.object({
    jobId: z.string(),
    answers: z.array(
      z.object({
        question: z.object({
          id: z.string(),
          question: z.string(),
          time: z.number(),
        }),
      })
    ),
  })
);

const claims = auth.getClaims();

const createInterview = prisma.interview.create({
  data: {
    answers: tineVar(input, 'answers'),
    job: { connect: { id: tineVar(input, 'jobId') } },
    interviewee: { connect: { id: tineVar(claims, 'userId') } },
  },
});

const setOnboardTrue = prisma.user.update({
  where: { id: tineVar(claims, 'userId') },
  data: { onboarded: true },
});

const submitInterview = task(async (ctx) => {
  const [interview] = await Promise.all([
    createInterview.run(ctx),
    setOnboardTrue.run(ctx),
  ]);

  return interview;
});

export default submitInterview.withInput(input);
