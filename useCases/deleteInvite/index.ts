import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(
  z.object({ companyId: z.string(), recipientEmail: z.string() })
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const deleteInterview = prisma.companyInvite.delete({
  where: {
    recipientEmail_companyId: {
      recipientEmail: tineVar(input, 'recipientEmail'),
      companyId: tineVar(claims, 'companyId'),
    },
  },
});

export default deleteInterview.withInput(input);
