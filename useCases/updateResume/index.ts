import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import prisma from '@/actions/prisma';
import auth from '@/actions/auth';

const input = tineInput(
  z.object({
    resumeFileName: z.string().nullable(),
  })
);

const claims = auth.getClaims();

const updateProfile = prisma.user.update({
  where: {
    id: tineVar(claims, 'userId'),
  },
  data: {
    resumeFileName: tineVar(input, 'resumeFileName'),
  },
  select: {
    id: true,
  },
});

export default updateProfile.withInput(input);
