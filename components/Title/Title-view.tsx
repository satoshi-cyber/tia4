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
  before,
  after,
}) => (
  <div
    className={clsx(
      'flex flex-col w-full items-center mb-10 relative px-[50px]',
      className
    )}
  >
    <div className="flex flex-row w-full items-center text-center">
      {before && <div className="absolute left-0 h-[38px]">{before}</div>}
      <Text
        as="h1"
        isLoading={isLoading}
        className="w-full text-2xl md:text-3xl text-normal text-gray-900 text-center break-all"
        text={title}
        skeletonProps={skeletonProps}
      />
      {after && <div className="absolute right-0 h-[38px]">{after}</div>}
    </div>
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
