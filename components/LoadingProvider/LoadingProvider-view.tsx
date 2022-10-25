import React from 'react'

import { LoadingContext } from './LoadingProvider-context'
import { LoadingProviderProps } from './LoadingProvider-types'

const LoadingProvider: React.FC<LoadingProviderProps> & {
  Context: typeof LoadingContext
} = ({ isLoading, children }) => {
  return (
    <LoadingContext.Provider value={isLoading || false}>
      {children}
    </LoadingContext.Provider>
  )
}

LoadingProvider.Context = LoadingContext

export default LoadingProvider
