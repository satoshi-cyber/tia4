import { Text } from '@/components';
import Avatar from '@/components/Avatar';
import ButtonIcon from '@/components/ButtonIcon';

import {
  AVATAR_PROPS,
  CLASS_NAMES,
  LABEL_PROPS,
  ROLE_PROPS,
} from './Item-constants';
import { useItem } from './Item-hook';
import { ItemProps } from './Item-types';

const Item: React.FC<ItemProps> = ({ member }) => {
  const { label, avatar, roleLabel, isButtonVisible, buttonIcon } = useItem({
    member,
  });

  return (
    <div className={CLASS_NAMES.container}>
      <div className={CLASS_NAMES.left}>
        <Avatar {...AVATAR_PROPS} text={label} src={avatar} />
        <div className={CLASS_NAMES.details}>
          <Text {...LABEL_PROPS} text={label} />
          <Text {...ROLE_PROPS} text={roleLabel} />
        </div>
      </div>
      {isButtonVisible && <ButtonIcon name={buttonIcon} />}
    </div>
  );
};

export default Item;
