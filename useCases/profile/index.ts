import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';

import { tineVar } from 'tinejs';

const claims = getClaims();

const profile = prisma.user.findUnique({
  where: {
    id: tineVar(claims, 'userId'),
  },
});

export default profile.noInput();
