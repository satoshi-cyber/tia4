import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(
  z.object({ companyId: z.string(), userId: z.string() })
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const deleteMember = prisma.companyMember.delete({
  where: {
    userId_companyId: {
      userId: tineVar(input, 'userId'),
      companyId: tineVar(claims, 'companyId'),
    },
  },
});

export default deleteMember.withInput(input);
