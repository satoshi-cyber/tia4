import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import Text from '@/components/Text';
import Link from 'next/link';
import { URLS } from '@/config';

import { BUTTON_PROPS, CLASS_NAMES, TITLE } from './EmptyScreen-constants';

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Text className={CLASS_NAMES.title} text={TITLE} />
    <Link href={URLS.DEMO_INTERVIEW} shallow>
      <PrimaryButton {...BUTTON_PROPS} />
    </Link>
  </div>
);

export default EmptyScreen;
