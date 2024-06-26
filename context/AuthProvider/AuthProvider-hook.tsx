import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { getCookieOptions } from '@/lib/cookie';
import { StatusError } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

export const useAuthProvider = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [manualLogout, setManualLogout] = useState(false);

  const token = cookies[TOKEN_COOKIE_KEY];

  const setToken = useCallback((cookieToken?: string) => {
    if (!cookieToken) {
      removeCookie(TOKEN_COOKIE_KEY, { path: '/' });

      return;
    }

    setCookie(TOKEN_COOKIE_KEY, cookieToken, getCookieOptions());
  }, []);

  const swrValue = useMemo(
    () => ({
      onError: (error: StatusError) => {
        if (error.status === 401) {
          setToken(undefined);

          return;
        }
      },
    }),
    []
  );

  return { token, setToken, swrValue, manualLogout, setManualLogout };
};
