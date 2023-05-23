import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { tineVar } from 'tinejs';

const claims = auth.getClaims();

const user = prisma.user.findUnique({
  where: { id: tineVar(claims, 'userId') },
  include: {
    companies: true,
  },
});

const refreshClaims = auth.signToken(tineVar(user));

export default refreshClaims.noInput();
