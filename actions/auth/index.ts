import { CompanyMember, User } from '@prisma/client/edge';
import { tineAction } from 'tinejs';
import jwt from 'jsonwebtoken';

import { env } from '../config';

const signToken = tineAction(
  (
    user: Pick<User, 'id' | 'role' | 'onboarded'> & {
      companies: CompanyMember[];
    }
  ) => ({
    token: jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
        onboarded: user.onboarded,
        companyRoles: user.companies.map((company) => ({
          companyId: company.companyId,
          role: company.role,
        })),
      },
      env.JWT_SECRET
    ),
  }),
  {
    action: 'auth.signToken',
  }
);

const auth = {
  signToken,
};

export default auth;
