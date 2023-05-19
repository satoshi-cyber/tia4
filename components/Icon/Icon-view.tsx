import React from 'react';

import { IconProps } from './Icon-types';
import dynamic from 'next/dynamic';

import SkeletonLoader from '../SkeletonLoader';
import Icons from '../Icons';

const Icon: React.FC<IconProps> = ({
  name,
  size,
  isLoading,
  className,
  ...props
}) => {
  if (!name) {
    return null;
  }

  const IconComponent =
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
            width={size}
            height={size}
          />
        ),
      }
    );

  return (
    <SkeletonLoader
      className={className}
      isLoading={isLoading}
      width={size}
      height={size}
      after={
        <div className={className}>
          <IconComponent size={size} {...props} />
        </div>
      }
    />
  );
};

export default Icon;
