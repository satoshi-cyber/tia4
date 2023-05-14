import React from 'react';
import { SWRConfig } from 'swr';

import { AuthContext } from './AuthProvider-context';
import { useAuthProvider } from './AuthProvider-hook';
import { AuthProviderProps } from './AuthProvider-types';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, setToken, swrValue } = useAuthProvider();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <SWRConfig value={swrValue}>{children}</SWRConfig>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
