import React, { useContext } from 'react';

import { LoadingContext } from './LoadingProvider-context';
import { LoadingProviderProps } from './LoadingProvider-types';

const LoadingProvider: React.FC<LoadingProviderProps> & {
  Context: typeof LoadingContext;
} = ({ isLoading, children }) => {
  const parentLoading = useContext(LoadingContext);

  return (
    <LoadingContext.Provider value={isLoading || parentLoading || false}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.Context = LoadingContext;

export default LoadingProvider;
