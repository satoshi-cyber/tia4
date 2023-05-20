import React from 'react';
import { Avatar, Text } from '@/components/';

import { FooterProps } from './Footer-types';
import { CLASS_NAMES } from './Footer-constants';

const Footer: React.FC<FooterProps> = ({
  companyName,
  companyLogo,
  appliedDate,
}) => (
  <div className={CLASS_NAMES.container}>
    <div className={CLASS_NAMES.avatarContainer}>
      <Avatar text={companyName} src={companyLogo} size={40} />
    </div>
    <div className={CLASS_NAMES.details}>
      <Text
        className={CLASS_NAMES.companyName}
        text={companyName}
        skeletonProps={{ width: 100 }}
      />
      <Text
        className={CLASS_NAMES.appliedDate}
        text={appliedDate}
        skeletonProps={{ width: 60 }}
      />
    </div>
  </div>
);

export default Footer;
