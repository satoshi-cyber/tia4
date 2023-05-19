import { tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const claims = auth.getClaims();

const skipOnboarding = prisma.user.update({
  where: { id: tineVar(claims, 'userId') },
  data: { onboarded: true },
});

export default skipOnboarding.noInput();
