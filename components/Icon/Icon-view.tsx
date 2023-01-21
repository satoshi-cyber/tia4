import React from 'react';

import { IconProps } from './Icon-types';

import SkeletonLoader from '../SkeletonLoader';
import Icons from '../Icons';

const Icon: React.FC<IconProps> = ({
  name,
  size,
  isLoading,
  className,
  ...props
}) => {
  const IconComponent = Icons[name];

  return (
    <SkeletonLoader
      className={className}
      isLoading={isLoading}
      width={size}
      height={size}
      after={<IconComponent size={size} className={className} {...props} />}
    />
  );
};

export default Icon;
