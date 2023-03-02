import { TOAST_OPTIONS } from '@/config';
import { CompanyMemberRole, useDeleteInviteMutation } from '@/graphql';
import { useUser } from '@/hooks';
import { toast } from 'react-toastify';

import { ROLE_LABEL, TOAST_MESSAGE } from './Item-constants';
import { ItemProps } from './Item-types';

export const useItem = ({ member }: ItemProps) => {
  const { claims, companyRole, companyId } = useUser();

  const [{ fetching: deletingInvite }, deleteInvite] = useDeleteInviteMutation()

  const buttonIcon = 'recipientEmail' in member ? 'HiTrash' : 'HiPencil';

  const label =
    'recipientEmail' in member
      ? member.recipientEmail
      : `${member.user.firstName} ${member.user.lastName}`;

  const roleLabel = `(${'recipientEmail' in member ? 'invited' : ROLE_LABEL[member.role]})`;

  const avatar = ('user' in member && member.user.avatarUrl) || '';

  const isButtonVisible =
    companyRole === CompanyMemberRole.AdminMember &&
    ('recipientEmail' in member || member.user.id !== claims?.userId);

  const submitting = deletingInvite

  const handleDeleteInvite = async () => {
    if (!('recipientEmail' in member)) {
      return
    }

    const toastMessage = TOAST_MESSAGE.deleteInvite

    try {
      await deleteInvite({ companyId: companyId!, recipientEmail: member.recipientEmail }, { additionalTypenames: ['CompanyInvite'] })

      toast.success(toastMessage.success, TOAST_OPTIONS)

    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS)
    }

  }

  const handleClick = 'recipientEmail' in member ? handleDeleteInvite : () => { }

  return {
    buttonIcon,
    label,
    roleLabel,
    avatar,
    isButtonVisible,
    submitting,
    handleClick
  } as const;
};
