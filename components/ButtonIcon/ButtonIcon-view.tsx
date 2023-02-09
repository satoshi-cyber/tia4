import React from 'react';

import { IconProps } from './ButtonIcon-types';

import SkeletonLoader from '../SkeletonLoader';
import Icons from '../Icons';
import clsx from 'clsx';

const ButtonIcon: React.FC<IconProps> = ({
  name,
  active,
  className,
  isLoading,
  size = 38,
  circle = true,
  ...props
}) => {
  const IconComponent = Icons[name];

  return (
    <SkeletonLoader
      isLoading={isLoading}
      className={className}
      width={size}
      height={size}
      circle={circle}
      after={
        <div>
          <button
            type="button"
            className={clsx(
              circle ? 'rounded-full' : 'rounded-md',
              className,
              'transition-all p-2 border border-gray-200 text-gray-800 hover:text-purple-800 hover:border-gray-100 hover:shadow-button',
              active ? 'text-purple-800 border-gray-100 shadow-button' : ''
            )}
            {...props}
          >
            <IconComponent size={size - 18} />
          </button>
        </div>
      }
    />
  );
};

export default ButtonIcon;
