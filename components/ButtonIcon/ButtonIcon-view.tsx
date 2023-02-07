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
  ...props
}) => {
  const IconComponent = Icons[name];

  return (
    <SkeletonLoader
      isLoading={isLoading}
      className={className}
      width={38}
      height={38}
      circle
      after={
        <div>
          <button
            type="button"
            className={clsx(
              className,
              'transition-all p-2 border border-gray-200 rounded-full text-gray-600 hover:text-purple-800 hover:border-gray-100 hover:shadow-button',
              active ? 'text-purple-800 border-gray-100 shadow-button' : ''
            )}
            {...props}
          >
            <IconComponent size={20} />
          </button>
        </div>
      }
    />
  );
};

export default ButtonIcon;
