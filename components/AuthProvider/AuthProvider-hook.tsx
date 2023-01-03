import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

export const useAuthProvider = () => {
  const [{ [TOKEN_COOKIE_KEY]: token }, setCookie, removeCookie] = useCookies([
    TOKEN_COOKIE_KEY,
  ]);

  const setToken = useCallback((cookieToken?: string) => {
    if (!cookieToken) {
      removeCookie(TOKEN_COOKIE_KEY);

      return;
    }

    setCookie(TOKEN_COOKIE_KEY, cookieToken);
  }, []);

  return { token, setToken };
};
