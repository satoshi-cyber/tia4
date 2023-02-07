import Icon from '@/components/Icon';
import PrimaryButton from '@/components/PrimaryButton';
import { URLS } from '@/config';
import Link from 'next/link';
import React from 'react';

import {
  BUTTON_TITLE,
  CLASS_NAMES,
  ICON_PROPS,
  TITLE,
} from './EmptyScreen-constants';

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <p className={CLASS_NAMES.title}>{TITLE}</p>
    <Link href={URLS.CREATE_A_JOB}>
      <PrimaryButton title={BUTTON_TITLE} before={<Icon {...ICON_PROPS} />} />
    </Link>
  </div>
);

export default EmptyScreen;
