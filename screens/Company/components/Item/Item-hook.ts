import { CompanyMemberRole } from '@/graphql';
import { useUser } from '@/hooks';

import { ItemProps } from './Item-types';

export const useItem = ({ member }: ItemProps) => {
  const { claims, companyRole } = useUser();

  const buttonIcon = 'recipientEmail' in member ? 'HiTrash' : 'HiPencil';

  const label =
    'recipientEmail' in member
      ? member.recipientEmail
      : `${member.user.firstName} ${member.user.lastName}`;

  const roleLabel = `(${'recipientEmail' in member ? 'invited' : member.role})`;

  const avatar = ('user' in member && member.user.avatarUrl) || '';

  const isButtonVisible =
    companyRole === CompanyMemberRole.AdminMember &&
    ('recipientEmail' in member || member.user.id !== claims?.userId);

  return {
    buttonIcon,
    label,
    roleLabel,
    avatar,
    isButtonVisible,
  } as const;
};
