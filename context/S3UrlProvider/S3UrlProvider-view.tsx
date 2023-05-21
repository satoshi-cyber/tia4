import React, { useCallback, useRef } from 'react';

import { S3UrlProviderContext } from './S3UrlProvider-context';

const S3UrlProvider: React.FC<{ children: React.ReactNode }> & {
  Context: typeof S3UrlProviderContext;
} = ({ children }) => {
  const map = useRef(new Map());

  const getUrl = useCallback((url: string) => {
    const key = url.split('?')[0];

    if (!map.current.has(key)) {
      map.current.set(key, url);

      return url;
    }

    return map.current.get(key) as string;
  }, []);

  const invalidateUrl = useCallback((url: string) => {
    const key = url.split('?')[0];

    map.current.delete(key);
  }, []);

  return (
    <S3UrlProviderContext.Provider value={{ getUrl, invalidateUrl }}>
      {children}
    </S3UrlProviderContext.Provider>
  );
};

S3UrlProvider.Context = S3UrlProviderContext;

export default S3UrlProvider;
