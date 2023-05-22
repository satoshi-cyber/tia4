import { TOAST_OPTIONS } from '@/config';
import { CompanyMemberRole, useDeleteMemberMutation } from '@/graphql';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { ROLE_LABEL, TOAST_MESSAGE } from './Item-constants';
import { ItemProps } from './Item-types';

export const useItem = ({ member }: ItemProps) => {
  const { claims, companyRole, companyId } = useUser();

  const { isMutating: deletingInvite, trigger: deleteInvite } =
    UseCases.deleteInvite.mutate();

  const [{ fetching: deletingMember }, deleteMember] =
    useDeleteMemberMutation();

  const buttonIcon = 'HiTrash';

  const label =
    'recipientEmail' in member
      ? member.recipientEmail
      : member.user.firstName
      ? `${member.user.firstName} ${member.user.lastName}`
      : member.user.email;

  const roleLabel = `(${
    'recipientEmail' in member ? 'invited' : ROLE_LABEL[member.role]
  })`;

  const avatar = ('user' in member && member.user.avatarUrl) || '';

  const isButtonVisible =
    companyRole === CompanyMemberRole.AdminMember &&
    ('recipientEmail' in member || member.user.id !== claims?.userId);

  const submitting = deletingInvite || deletingMember;

  const handleDeleteInvite = async () => {
    if (!('recipientEmail' in member) || !companyId) {
      return;
    }

    const toastMessage = TOAST_MESSAGE.deleteInvite;

    try {
      await deleteInvite({
        companyId: companyId,
        recipientEmail: member.recipientEmail,
      });

      mutate(UseCases.companyMembers.getKey());

      toast.success(toastMessage.success, TOAST_OPTIONS);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
  };

  const handleDeleteMember = async () => {
    if (!('user' in member)) {
      return;
    }

    const toastMessage = TOAST_MESSAGE.deleteMember;

    try {
      await deleteMember(
        { companyId: companyId!, userId: member.user.id },
        { additionalTypenames: ['CompanyMember'] }
      );

      mutate(UseCases.companyMembers.getKey());

      toast.success(toastMessage.success, TOAST_OPTIONS);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
  };

  const handleClick =
    'recipientEmail' in member ? handleDeleteInvite : handleDeleteMember;

  return {
    buttonIcon,
    label,
    roleLabel,
    avatar,
    isButtonVisible,
    submitting,
    handleClick,
  } as const;
};
