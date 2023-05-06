import { Magic } from 'magic-sdk';
import { useCallback, useContext, useMemo } from 'react';
import { OAuthExtension, OAuthProvider } from '@magic-ext/oauth';
import { useAuthenticateUserMutation } from '@/graphql';
import jwtDecode from 'jwt-decode';

import { JWTClaims } from './useUser-types';

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

  const [{ fetching }, authenticateUser] = useAuthenticateUserMutation();

  const router = useRouter();

  const from = router.query.from;

  magic?.user.getIdToken().then(console.log);

  const login = useCallback(
    async (email: string) => {
      const redirectURI = from
        ? `${window.location.origin}/redirect-callback/${from}`
        : `${window.location.origin}/redirect-callback`;

      const did = await magic?.auth.loginWithMagicLink({ email, redirectURI });

      if (!did) {
        return;
      }

      const res = await authenticateUser({ input: { did } });

      setToken(res.data?.authenticateUser.token);
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
      input: { did, firstName, lastName, accessToken, fk, provider },
    });

    setToken(res.data?.authenticateUser.token);
  }, []);

  const authenticateUserFromRedirect = useCallback(async () => {
    const did = await magic?.auth.loginWithCredential();

    return did;
  }, []);

  const authenticateUserFromDid = useCallback(async (did: string) => {
    const res = await authenticateUser({ input: { did } });

    setToken(res.data?.authenticateUser.token);
  }, []);

  const refreshToken = useCallback(async () => {
    const did = await magic?.user.getIdToken();

    if (!did) {
      return;
    }

    const res = await authenticateUser({ input: { did } });

    setToken(res.data?.authenticateUser.token);
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
