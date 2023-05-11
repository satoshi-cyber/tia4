import { CompanyMember, User } from '@prisma/client/edge';
import { tineAction } from 'tinejs';
import { SignJWT } from 'jose';

import { env } from '../../config';

const signToken = tineAction(
  async (
    user: Pick<User, 'id' | 'role' | 'onboarded'> & {
      companies: CompanyMember[];
    }
  ) => {
    const token = await new SignJWT({
      userId: user.id,
      userRole: user.role,
      onboarded: user.onboarded,
      companyRoles: user.companies.map((company) => ({
        companyId: company.companyId,
        role: company.role,
      })),
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(new TextEncoder().encode(env.JWT_SECRET));

    return { token };
  },
  {
    action: 'auth.signToken',
  }
);

export default signToken;
