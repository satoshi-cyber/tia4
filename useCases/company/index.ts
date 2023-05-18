import prisma from '@/actions/prisma';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const company = prisma.company.findUnique({
  where: {
    id: tineVar(input, 'companyId'),
  },
  select: {
    id: true,
    name: true,
    avatarUrl: true,
  },
});

// Is used in join company and needs to be public endpoint
export default company.withInput(input);
