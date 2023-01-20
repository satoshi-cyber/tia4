'use client';

import clsx from 'clsx';
import React from 'react';
import SkeletonLoader from '../SkeletonLoader';

import { CLASS_NAMES } from './SecondaryButton-constants';
import { SecondaryButtonProps } from './SecondaryButton-types';

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  variant = 'default',
  className,
  skeletonProps,
  isLoading,
  ...restProps
}) => {
  const classNames = CLASS_NAMES[variant];

  return (
    <button
      className={clsx(classNames.button, className)}
      {...restProps}
      type="button"
    >
      <SkeletonLoader isLoading={isLoading} after={title} {...skeletonProps} />
    </button>
  );
};

export default SecondaryButton;
