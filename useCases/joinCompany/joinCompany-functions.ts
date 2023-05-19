import prisma from '@/actions/prisma';
import { TineAction, TineInput, payload, tineVar } from 'tinejs';

export const deleteInviteAndUpdateUser = ({
  user,
  input,
}: {
  user: TineAction<{ id: string; email: string }>;
  input: TineInput<{ companyId: string }>;
}) => {
  const deletedInvite = prisma.companyInvite.delete({
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

  const setOnboardTrue = prisma.user.update({
    where: { id: tineVar(user, 'id') },
    data: { onboarded: true },
  });

  return payload(
    tineVar(
      [deletedInvite, deletePreviousMembership, setOnboardTrue] as const,
      ([$deletedInvite]) => $deletedInvite
    )
  );
};
