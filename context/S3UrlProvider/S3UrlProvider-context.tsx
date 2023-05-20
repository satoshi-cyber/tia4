import React from 'react';
import { S3UrlProviderContextType } from './S3UrlProvider-types';

export const S3UrlProviderContext =
  React.createContext<S3UrlProviderContextType>({
    getUrl: (_) => _,
    invalidateUrl: (_: string) => undefined,
  });
