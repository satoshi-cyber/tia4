import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { editCompanySchema } from '@/types';

const input = tineInput(
  z.intersection(editCompanySchema, z.object({ companyId: z.string() }))
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const editCompany = prisma.company.update({
  where: {
    id: tineVar(claims, 'companyId'),
  },
  data: {
    name: tineVar(input, 'name'),
    website: tineVar(input, 'website'),
    description: tineVar(input, 'description'),
  },
});

export default editCompany.withInput(input);
