import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'

import LoadingProvider from '../LoadingProvider'

import { SkeletonLoaderProps } from './SkeletonLoader-types'

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  after = null,
  isLoading,
  wrapper: Wrapper = React.Fragment,
  ...skeletonProps
}) => {
  const isProviderLoading = useContext(LoadingProvider.Context)

  return isProviderLoading || isLoading ? (
    <Wrapper>
      <Skeleton {...skeletonProps} />
    </Wrapper>
  ) : (
    <>{after}</>
  )
}

export default SkeletonLoader
