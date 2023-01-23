import React from 'react';
import { ButtonIcon, Text } from '@/components';

import {
  CLASS_NAMES,
  EDIT_BUTTON_PROPS,
  LINK_BUTTON_PROPS,
} from './Item-constants';
import { ItemProps } from './Item-types';
import { useItem } from './Item-hook';

const Item: React.FC<ItemProps> = ({ title, deadline, id }) => {
  const { handleEditJob, handleCopyLink, deadlineLabel } = useItem({
    jobId: id,
    deadline,
  });

  return (
    <div className={CLASS_NAMES.container}>
      <div>
        <Text
          className={CLASS_NAMES.title}
          text={title}
          skeletonProps={{ width: 100 }}
        />
        <Text
          className={CLASS_NAMES.deadline}
          text={deadlineLabel}
          skeletonProps={{ width: 200 }}
        />
      </div>
      <div className={CLASS_NAMES.options}>
        <ButtonIcon {...EDIT_BUTTON_PROPS} onClick={handleEditJob} />
        <ButtonIcon {...LINK_BUTTON_PROPS} onClick={handleCopyLink} />
      </div>
    </div>
  );
};

export default Item;
