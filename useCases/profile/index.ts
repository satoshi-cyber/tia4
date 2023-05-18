import { tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const claims = auth.getClaims();

const profile = prisma.user.findUnique({
  where: {
    id: tineVar(claims, 'userId'),
  },
});

export default profile.noInput();
