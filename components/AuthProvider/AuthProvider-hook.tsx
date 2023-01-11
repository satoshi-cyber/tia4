import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

import { COOKIE_EXPIRE } from './AuthProvider-constants';

export const useAuthProvider = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const token = cookies[TOKEN_COOKIE_KEY];

  const setToken = useCallback((cookieToken?: string) => {
    console.log({ cookieToken });

    if (!cookieToken) {
      removeCookie(TOKEN_COOKIE_KEY, { path: '/' });

      return;
    }

    setCookie(TOKEN_COOKIE_KEY, cookieToken, {
      path: '/',
      expires: new Date(Date.now() + COOKIE_EXPIRE),
    });
  }, []);

  return { token, setToken };
};
