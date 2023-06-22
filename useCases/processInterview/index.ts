import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import { InterviewStatus } from '@prisma/client/edge';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { env } from '@/actions/config';

const input = tineInput(
  z.object({
    id: z.string(),
  })
);

const claims = auth.getClaims();

const processInterview = task(async (ctx) => {
  const interview = await prisma.interview
    .update({
      where: {
        id: tineVar(input, 'id'),
        intervieweeId: tineVar(claims, 'userId'),
      },
      data: {
        status: InterviewStatus.proccessing,
      },
    })
    .run(ctx);

  const videos = interview.answers.map(
    (answer) => `${interview.id}-${answer.question.id}.mp4`
  );

  const response = await fetch(env.CONVERTER_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: interview.id,
      videos,
    }),
  });

  return response.status === 200;
});

export default processInterview.withInput(input);
