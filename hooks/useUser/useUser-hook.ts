import { Magic } from 'magic-sdk';
import { UseCases } from '@/useCases';
import { JWTClaims } from '@/types';
import { useCallback, useContext, useMemo } from 'react';
import { OAuthExtension, OAuthProvider } from '@magic-ext/oauth';
import jwtDecode from 'jwt-decode';

import { AuthContext } from '../../components/AuthProvider';
import { useRouter } from 'next/router';

const magic =
  typeof window !== 'undefined'
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!, {
        extensions: [new OAuthExtension()],
      })
    : undefined;

export const useUser = () => {
  const { token, setToken } = useContext(AuthContext);

  const { trigger: authenticateUser, isMutating: fetching } =
    UseCases.authenticateUser.mutate();

  const router = useRouter();

  const from = router.query.from;

  const login = useCallback(
    async (email: string) => {
      const did = await magic?.auth.loginWithEmailOTP({ email });

      if (!did) {
        return;
      }

      const res = await authenticateUser({ did });

      setToken(res?.token);
    },
    [setToken]
  );

  const loginWithProvider = useCallback(
    (provider: OAuthProvider) =>
      new Promise((resolve) => {
        window.addEventListener('popstate', () => {
          resolve(true);
        });

        const redirectURI = from
          ? `${window.location.origin}/oauth-callback/${from}`
          : `${window.location.origin}/oauth-callback`;

        magic?.oauth.loginWithRedirect({
          provider,
          redirectURI,
        });
      }),
    []
  );

  const authenticateUserFromOAuth = useCallback(async () => {
    const magicRes = await magic?.oauth.getRedirectResult();

    const did = magicRes?.magic.idToken;

    if (!did) {
      return;
    }

    const firstName = magicRes?.oauth.userInfo.givenName;
    const lastName = magicRes?.oauth.userInfo.familyName;

    const accessToken = magicRes?.oauth.accessToken;
    const fk = magicRes?.oauth.userHandle;
    const provider = magicRes?.oauth.provider;

    const res = await authenticateUser({
      did,
      firstName,
      lastName,
      accessToken,
      fk,
      provider,
    });

    setToken(res?.token);
  }, []);

  const authenticateUserFromRedirect = useCallback(async () => {
    const did = await magic?.auth.loginWithCredential();

    return did;
  }, []);

  const authenticateUserFromDid = useCallback(async (did: string) => {
    const res = await authenticateUser({ did });

    setToken(res?.token);
  }, []);

  const refreshToken = useCallback(async () => {
    const did = await magic?.user.getIdToken();

    if (!did) {
      return;
    }

    const res = await authenticateUser({ did });

    setToken(res?.token);
  }, [setToken]);

  const logout = useCallback(() => {
    setToken(undefined);

    magic?.user.logout();
  }, [setToken]);

  const isUserLoggedin = useMemo(() => Boolean(token), [token]);

  const claims = useMemo(
    () => (token ? jwtDecode<JWTClaims>(token) : undefined),
    [token]
  );

  const companyId =
    claims && claims.companyRoles[0] && claims.companyRoles[0].companyId;

  const companyRole =
    claims && claims.companyRoles[0] && claims.companyRoles[0].role;

  const hasCompany = Boolean(companyId);

  return {
    fetching,
    claims,
    login,
    logout,
    setToken,
    hasCompany,
    companyId,
    companyRole,
    isUserLoggedin,
    token,
    refreshToken,
    authenticateUserFromOAuth,
    authenticateUserFromRedirect,
    loginWithProvider,
    authenticateUserFromDid,
  };
};
