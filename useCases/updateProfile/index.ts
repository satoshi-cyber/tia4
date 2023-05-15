import { updateProfileSchema } from '@/types';
import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';

import { tineInput, tineVar } from 'tinejs';

const input = tineInput(updateProfileSchema);

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
    bio: tineVar(input, 'bio'),
  },
});

export default updateProfile.withInput(input);
