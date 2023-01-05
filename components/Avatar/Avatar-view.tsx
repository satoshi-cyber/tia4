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
  <SkeletonLoader
    isLoading={isLoading}
    width={size}
    height={size}
    borderRadius={'100%'}
    after={
      <div style={{ flex: 'none', borderRadius: '100%' }} className={className}>
        <ReactAvatar round {...restProps} size={`${size}`} />
      </div>
    }
  />
);

export default Avatar;
