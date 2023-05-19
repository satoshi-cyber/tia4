import { z } from 'zod';
import { payload, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

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

const deleteInvite = prisma.companyInvite.delete({
  where: {
    recipientEmail_companyId: {
      recipientEmail: tineVar(user, 'email'),
      companyId: tineVar(input, 'companyId'),
    },
  },
});

const deletePreviousMembership = prisma.companyMember.deleteMany({
  where: {
    userId: tineVar(user, 'id'),
  },
});

const updateUser = prisma.user.update({
  where: { id: tineVar(user, 'id') },
  data: { onboarded: true },
});

const cleanup = payload({
  isInvited: tineVar(isInvited),
  invite: tineVar(
    [deleteInvite, deletePreviousMembership, updateUser] as const,
    ([$invite]) => $invite
  ),
});

const joinCompany = prisma.companyMember.create({
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
    role: tineVar(cleanup, 'invite.role'),
  },
});

export default joinCompany.withInput(input);
