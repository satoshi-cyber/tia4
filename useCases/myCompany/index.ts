import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const myCompany = prisma.company.findUnique({
  where: {
    id: tineVar(claims, 'companyId'),
  },
  select: {
    id: true,
    name: true,
    website: true,
    description: true,
    avatarUploadUrl: true,
    avatarUrl: true,
  },
});

export default myCompany.withInput(input);
