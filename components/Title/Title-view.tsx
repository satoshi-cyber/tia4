import React from 'react'
import Skeleton from 'react-loading-skeleton'

import SkeletonLoader from '../SkeletonLoader'
import { TitleProps } from './Title-types'

const Text: React.FC<TitleProps> = ({
  title,
  isLoading,
  skeletonProps,
  ...restProps
}) => (
  <h1
    className="text-3xl text-normal mb-10 text-gray-900 text-center"
    {...restProps}
  >
    <SkeletonLoader isLoading={isLoading} {...skeletonProps} after={title} />
  </h1>
)

export default Text
