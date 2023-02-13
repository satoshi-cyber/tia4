import { PrimaryButton, Text } from '@/components';
import { URLS } from '@/config';
import Link from 'next/link';
import React from 'react';

import {
  CLASS_NAMES,
  TITLE,
  SUB_TITLE,
  BUTTON_PROPS,
} from './EmptyScreen-constants';

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Text className={CLASS_NAMES.title} text={TITLE} />
    <Text className={CLASS_NAMES.subTitle} text={SUB_TITLE} />
    <div>
      <Link href={URLS.RATE_DEMO}>
        <PrimaryButton {...BUTTON_PROPS} />
      </Link>
    </div>
  </div>
);

export default EmptyScreen;
