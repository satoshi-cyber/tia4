import { payload, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { CompanyMemberRole } from '@prisma/client/edge';
import { setupCompanySchema } from '@/types';

const input = tineInput(setupCompanySchema);

const claims = auth.getClaims();

const createCompany = prisma.company.create({
  data: {
    
    name: tineVar(input, 'name'),
    website: tineVar(input, 'website'),
    members: {
      create: {
        userId: tineVar(claims, 'userId'),
        role: CompanyMemberRole.adminMember,
      },
    },
  },
});

const updateUser = prisma.user.update({
  where: { id: tineVar(claims, 'userId') },
  data: { onboarded: true },
});

const setupCompany = payload(
  tineVar([createCompany, updateUser] as const, ([$company]) => $company)
);

export default setupCompany.withInput(input);
