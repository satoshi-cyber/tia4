import { z } from 'zod';
import { task, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims();

const user = prisma.user.findUnique({
  where: { id: tineVar(claims, 'userId') },
  select: { id: true, email: true },
});

const joinCompany = task(async (ctx) => {
  const isInvited = await prisma.companyInvite
    .findFirst({
      where: {
        companyId: tineVar(input, 'companyId'),
        recipientEmail: tineVar(user, 'email'),
      },
    })
    .run(ctx);

  if (!isInvited) {
    return null;
  }

  const [{ role }] = await Promise.all([
    prisma.companyInvite
      .delete({
        where: {
          recipientEmail_companyId: {
            recipientEmail: tineVar(user, 'email'),
            companyId: tineVar(input, 'companyId'),
          },
        },
      })
      .run(ctx),
    prisma.companyMember
      .deleteMany({
        where: {
          userId: tineVar(user, 'id'),
        },
      })
      .run(ctx),
    prisma.user
      .update({
        where: { id: tineVar(user, 'id') },
        data: { onboarded: true },
      })
      .run(ctx),
  ]);

  return await prisma.companyMember
    .create({
      data: {
        company: {
          connect: {
            id: tineVar(input, 'companyId'),
          },
        },
        user: {
          connect: {
            id: tineVar(user, 'id'),
          },
        },
        role,
      },
    })
    .run(ctx);
});

export default joinCompany.withInput(input);
