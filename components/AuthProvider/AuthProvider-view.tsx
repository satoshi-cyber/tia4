import React from 'react';
import { SWRConfig } from 'swr';

import { AuthContext } from './AuthProvider-context';
import { useAuthProvider } from './AuthProvider-hook';
import { AuthProviderProps } from './AuthProvider-types';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, setToken, swrValue, manualLogout, setManualLogout } =
    useAuthProvider();

  return (
    <AuthContext.Provider
      value={{ token, setToken, manualLogout, setManualLogout }}
    >
      <SWRConfig value={swrValue}>{children}</SWRConfig>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
