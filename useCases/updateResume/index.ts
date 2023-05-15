import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';

import { tineInput, tineVar } from 'tinejs';

const input = tineInput(
  z.object({
    resumeFileName: z.string().nullable(),
  })
);

const claims = getClaims();

const updateProfile = prisma.user.update({
  where: {
    id: tineVar(claims, 'userId'),
  },
  data: {
    resumeFileName: tineVar(input, 'resumeFileName'),
  },
});

export default updateProfile.withInput(input);
