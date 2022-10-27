import clsx from 'clsx'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

import SkeletonLoader from '../SkeletonLoader'
import { TitleProps } from './Title-types'

const Text: React.FC<TitleProps> = ({
  title,
  isLoading,
  skeletonProps,
  className,
  ...restProps
}) => (
  <h1
    className={clsx(
      'text-3xl text-normal mb-10 text-gray-900 text-center',
      className
    )}
    {...restProps}
  >
    <SkeletonLoader isLoading={isLoading} {...skeletonProps} after={title} />
  </h1>
)

export default Text
