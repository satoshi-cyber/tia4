import { z } from 'zod';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';

import { tineInput, tineVar } from 'tinejs';

const input = tineInput(
  z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    linkedInProfile: z.string().optional().nullable(),
    resumeFileName: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
  })
);

const claims = getClaims();

const updateProfile = prisma.user.update({
  where: {
    id: tineVar(claims, 'userId'),
  },
  data: {
    onboarded: true,
    firstName: tineVar(input, 'firstName'),
    lastName: tineVar(input, 'lastName'),
    linkedInProfile: tineVar(input, 'linkedInProfile'),
    resumeFileName: tineVar(input, 'resumeFileName'),
    bio: tineVar(input, 'bio'),
  },
});

export default updateProfile.withInput(input);
