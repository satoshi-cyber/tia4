import { z } from 'zod';
import { payload, tineInput, tineVar } from 'tinejs';
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

const interview = prisma.interview.create({
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

const submitInterview = payload(
  tineVar([interview, setOnboardTrue] as const, ([$interview]) => $interview)
);

export default submitInterview.withInput(input);
