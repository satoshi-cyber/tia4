import React from 'react';

import { AuthContext } from './AuthProvider-context';
import { useAuthProvider } from './AuthProvider-hook';
import { AuthProviderProps } from './AuthProvider-types';

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, setToken } = useAuthProvider();

  console.log({ token });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
