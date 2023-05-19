import { z } from 'zod';
import { payload, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const deleteMembers = prisma.companyMember.deleteMany({
  where: {
    companyId: tineVar(claims, 'companyId'),
  },
});

const deleteCompanyRow = prisma.company.delete({
  where: {
    id: tineVar(claims, 'companyId'),
  },
});

const process = payload({
  deleteMembers: tineVar(deleteMembers),
  deleteCompanyRow: tineVar(deleteCompanyRow),
});

const deleteCompany = payload(tineVar(process, 'deleteCompanyRow'));

export default deleteCompany.withInput(input);
