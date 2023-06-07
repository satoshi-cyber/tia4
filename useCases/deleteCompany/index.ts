import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const deleteCompany = task(async (ctx) => {
  await prisma.companyMember
    .deleteMany({
      where: {
        companyId: tineVar(claims, 'companyId'),
      },
    })
    .run(ctx);

  return await prisma.company
    .delete({
      where: {
        id: tineVar(claims, 'companyId'),
      },
    })
    .run(ctx);
});

export default deleteCompany.withInput(input);
