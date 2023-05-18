import { tineInput, tineVar } from 'tinejs';
import { updateProfileSchema } from '@/types';
import prisma from '@/actions/prisma';
import auth from '@/actions/auth';

const input = tineInput(updateProfileSchema);

const claims = auth.getClaims();

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
