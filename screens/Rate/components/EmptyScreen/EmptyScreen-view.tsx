import { PrimaryButton, Text } from '@/components';
import React from 'react';

import { CLASS_NAMES, TITLE, SUB_TITLE } from './EmptyScreen-constants';

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Text className={CLASS_NAMES.title} text={TITLE} />
    <Text className={CLASS_NAMES.subTitle} text={SUB_TITLE} />
    <div>
      <PrimaryButton title="Rate Demo Interview" />
    </div>
  </div>
);

export default EmptyScreen;
