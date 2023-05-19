import { z } from 'zod';
import { condition, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { deleteInviteAndUpdateUser } from './joinCompany-functions';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims();

const user = prisma.user.findUnique({
  where: { id: tineVar(claims, 'userId') },
  select: { id: true, email: true },
});

const isInvited = prisma.companyInvite.findFirstOrThrow({
  where: {
    companyId: tineVar(input, 'companyId'),
    recipientEmail: tineVar(user, 'email'),
  },
});

const deletedInvite = deleteInviteAndUpdateUser({ user, input });

const joinCompany = condition([
  tineVar(isInvited, ($isInvited) => Boolean($isInvited)),
  tineVar(deletedInvite, ($invite) =>
    prisma.companyMember.create({
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
        role: $invite.role,
      },
    })
  ),
]);

export default joinCompany.withInput(input);
