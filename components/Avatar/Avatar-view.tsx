import React from 'react';
import ReactAvatar from 'react-avatar';

import { AvatarProps } from './Avatar-types';

import SkeletonLoader from '../SkeletonLoader';

const Avatar: React.FC<AvatarProps> = ({
  isLoading,
  size,
  className,
  ...restProps
}) => (
  <div style={{ flex: 'none', borderRadius: '100%' }} className={className}>
    <SkeletonLoader
      isLoading={isLoading}
      width={size}
      height={size}
      borderRadius={'100%'}
      after={<ReactAvatar round {...restProps} size={`${size}`} />}
    />
  </div>
);

export default Avatar;
