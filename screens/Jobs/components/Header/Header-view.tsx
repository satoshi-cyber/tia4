import Link from 'next/link';
import React from 'react';
import { URLS } from '@/config';
import Title from '@/components/Title';
import PrimaryButton from '@/components/PrimaryButton';
import Icon from '@/components/Icon';

import {
  CLASS_NAMES,
  TITLE,
  SUB_TITLE,
  BUTTON_TITLE,
  ICON_PROPS,
} from './Header-constants';

const Header: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Title title={TITLE} subTitle={SUB_TITLE} />
    <div className={CLASS_NAMES.ctaWrapper}>
      <Link href={URLS.CREATE_A_JOB}>
        <PrimaryButton title={BUTTON_TITLE} before={<Icon {...ICON_PROPS} />} />
      </Link>
    </div>
  </div>
);

export default Header;
