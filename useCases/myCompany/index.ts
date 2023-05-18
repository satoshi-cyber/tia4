import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

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
