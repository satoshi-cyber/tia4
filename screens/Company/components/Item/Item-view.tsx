import { Text } from '@/components';
import Avatar from '@/components/Avatar';
import ButtonIcon from '@/components/ButtonIcon';
import { CompanyMemberRole } from '@/graphql';
import { useUser } from '@/hooks';
import { ItemProps } from './Item-types';

const Item: React.FC<ItemProps> = ({ member }) => {
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

  return (
    <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full">
      <div className="flex flex-row items-center">
        <Avatar
          text={label}
          size={40}
          className="mr-2 flex-none"
          src={avatar}
        />
        <div className="flex flex-row items-center text-md md:text-lg text-gray-800 mr-2 break-all">
          <Text
            text={label}
            as="span"
            className="mr-2"
            skeletonProps={{ width: 120 }}
          />
          <Text
            className="text-sm flex-none"
            text={roleLabel}
            as="span"
            skeletonProps={{ width: 60 }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 ml-4"></div>
      {isButtonVisible && <ButtonIcon name={buttonIcon} />}
    </div>
  );
};

export default Item;
