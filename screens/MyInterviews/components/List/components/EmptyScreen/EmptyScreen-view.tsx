import React from 'react';
import { Text } from '@/components';

import { CLASS_NAMES, TITLE } from './EmptyScreen-constants';

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Text className={CLASS_NAMES.title} text={TITLE} />
  </div>
);

export default EmptyScreen;
