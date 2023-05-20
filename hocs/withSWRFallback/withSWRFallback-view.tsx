import React from 'react';
import { NextPage } from 'next';

import { SWRConfig } from 'swr';

const withSWR = <P extends { fallback: any }>(
  WrappedComponent: NextPage<P>
) => {
  const EnhancedComponent = ({ fallback, ...restProps }: P) => {
    return (
      <SWRConfig
        value={{ fallback, revalidateIfStale: false, revalidateOnFocus: false }}
      >
        <WrappedComponent {...(restProps as P)} />
      </SWRConfig>
    );
  };

  return EnhancedComponent;
};

export default withSWR;
