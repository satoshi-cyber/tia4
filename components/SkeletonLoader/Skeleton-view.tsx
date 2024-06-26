import clsx from 'clsx';
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import LoadingProvider from '../../context/LoadingProvider';

import { SkeletonLoaderProps } from './SkeletonLoader-types';

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  after = null,
  isLoading,
  wrapper: Wrapper = React.Fragment,
  className,
  ...skeletonProps
}) => {
  const isProviderLoading = useContext(LoadingProvider.Context);

  const loading =
    typeof isLoading === 'undefined' ? isProviderLoading : isLoading;

  return loading ? (
    <Wrapper>
      <Skeleton
        {...skeletonProps}
        containerClassName={className}
        className={clsx(skeletonProps.height && 'leading-[unset]')}
      />
    </Wrapper>
  ) : (
    <>{after}</>
  );
};

export default SkeletonLoader;
