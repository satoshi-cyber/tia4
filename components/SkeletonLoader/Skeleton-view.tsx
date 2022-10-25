import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { SkeletonLoaderProps } from './SkeletonLoader-types'

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  after = null,
  isLoading,
  ...skeletonProps
}) => {
  return isLoading ? <Skeleton {...skeletonProps} /> : <>{after}</>
}

export default SkeletonLoader
