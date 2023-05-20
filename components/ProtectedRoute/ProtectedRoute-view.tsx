import React, { useContext, useEffect } from 'react';
import Router from 'next/router';

import { ProtectedRouteProps } from './ProtectedRoute-types';

import { URLS } from '@/config';
import { AuthContext } from '../../context/AuthProvider';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      Router.replace(URLS.LOGIN);
    }
  }, [token]);

  return <>{children}</>;
};

export default ProtectedRoute;
