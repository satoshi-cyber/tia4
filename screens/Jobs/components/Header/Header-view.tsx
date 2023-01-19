import Link from 'next/link';
import React from 'react';
import { URLS } from '@/config';
import { Icon, PrimaryButton } from '@/components';

import {
  CLASS_NAMES,
  TITLE,
  SUB_TITLE,
  BUTTON_TITLE,
  ICON_PROPS,
} from './Header-constants';

const Header: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <p className={CLASS_NAMES.title}>{TITLE}</p>
    <p className={CLASS_NAMES.subTitle}>{SUB_TITLE}</p>
    <div className={CLASS_NAMES.ctaWrapper}>
      <Link href={URLS.CREATE_A_JOB}>
        <PrimaryButton title={BUTTON_TITLE} before={<Icon {...ICON_PROPS} />} />
      </Link>
    </div>
  </div>
);

export default Header;
