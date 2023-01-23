import React from 'react';

import { TitleProps } from './Title-types';

import Text from '../Text';
import clsx from 'clsx';

const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  skeletonProps,
  subTitleSkeletonProps,
  isLoading,
  className,
}) => (
  <div className={clsx('flex flex-col w-full items-center mb-10', className)}>
    <Text
      as="h1"
      isLoading={isLoading}
      className="text-2xl md:text-3xl text-normal text-gray-900 text-center"
      text={title}
      skeletonProps={skeletonProps}
    />
    {subTitle && (
      <Text
        isLoading={isLoading}
        className="text-md md:text-lg text-gray-500 mt-2 whitespace-pre-line text-center"
        text={subTitle}
        skeletonProps={subTitleSkeletonProps}
      />
    )}
  </div>
);

export default Title;
