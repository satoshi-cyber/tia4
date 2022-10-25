import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'

import LoadingProvider from '../LoadingProvider'

import { SkeletonLoaderProps } from './SkeletonLoader-types'

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  after = null,
  isLoading,
  ...skeletonProps
}) => {
  const isProviderLoading = useContext(LoadingProvider.Context)

  return isProviderLoading || isLoading ? (
    <Skeleton {...skeletonProps} />
  ) : (
    <>{after}</>
  )
}

export default SkeletonLoader
