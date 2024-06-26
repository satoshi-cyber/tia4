import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import { IconProps } from './ButtonIcon-types';

import SkeletonLoader from '../SkeletonLoader';
import Icons from '../Icons';

const ButtonIcon: React.FC<IconProps> = ({
  name,
  active,
  className,
  isLoading,
  size = 38,
  circle = true,
  variant = 'default',
  ...props
}) => {
  const IconComponent = useMemo(
    () =>
      Icons[name as keyof typeof Icons] ??
      dynamic(
        () =>
          import(`@react-icons/all-files/hi/${name}.js`).then(
            (data) => data[name]
          ),
        {
          ssr: false,
          loading: () => (
            <SkeletonLoader
              isLoading
              className={className}
              circle={circle}
              width={size}
              height={size}
            />
          ),
        }
      ),
    [name]
  );

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
            style={{ width: size, height: size }}
            className={clsx(
              circle ? 'rounded-full' : 'rounded-md',
              className,
              variant === 'default' &&
                'border border-gray-200 hover:border-gray-100 hover:shadow-icon',
              'bg-white transition-all p-1 text-gray-600 hover:text-purple-800 flex items-center justify-center',
              active ? 'text-purple-800 border-gray-100 shadow-icon' : ''
            )}
            {...props}
          >
            <IconComponent size={Math.max((size * 20) / 38, 22)} />
          </button>
        </div>
      }
    />
  );
};

export default ButtonIcon;
