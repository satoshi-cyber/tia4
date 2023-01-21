import React from 'react';

import { IconProps } from './ButtonIcon-types';

import SkeletonLoader from '../SkeletonLoader';
import Icons from '../Icons';

const ButtonIcon: React.FC<IconProps> = ({
  name,
  size,
  className,
  isLoading,
  ...props
}) => {
  const IconComponent = Icons[name];

  return (
    <SkeletonLoader
      isLoading={isLoading}
      className={className}
      width={size}
      height={size}
      after={
        <button type="button" {...props}>
          <IconComponent size={size} className={className} />
        </button>
      }
    />
  );
};

export default ButtonIcon;
