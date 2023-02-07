import Icon from '@/components/Icon';
import PrimaryButton from '@/components/PrimaryButton';
import { URLS } from '@/config';
import Link from 'next/link';
import React from 'react';

import {
  BUTTON_TITLE,
  CLASS_NAMES,
  ICON_PROPS,
  SUB_TITLE,
  TITLE,
} from './EmptyScreen-constants';
import { EmptyScreenProps } from './EmptyScreen-types';

const EmptyScreen: React.FC<EmptyScreenProps> = ({ hasFilters }) => (
  <div className={CLASS_NAMES.container}>
    <p className={CLASS_NAMES.title}>{TITLE}</p>
    {hasFilters ? (
      <p className={CLASS_NAMES.subTitle}>{SUB_TITLE}</p>
    ) : (
      <Link href={URLS.CREATE_A_JOB} className={CLASS_NAMES.link}>
        <PrimaryButton title={BUTTON_TITLE} before={<Icon {...ICON_PROPS} />} />
      </Link>
    )}
  </div>
);

export default EmptyScreen;
