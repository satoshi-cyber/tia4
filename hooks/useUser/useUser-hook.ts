import { Magic } from "magic-sdk";
import { useCallback, useContext, useMemo } from "react";
import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth";
import { useAuthenticateUserMutation } from "@/graphql";
import jwtDecode from 'jwt-decode'

import { JWTClaims } from "./useUser-types";

import { AuthContext } from '../../components/AuthProvider'


const magic =
  typeof window !== 'undefined' ?
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!, {
      extensions: [new OAuthExtension()],
    }) : undefined

export const useUser = () => {
  const { token, setToken } = useContext(AuthContext)

  const [_, authenticateUser] = useAuthenticateUserMutation()

  const login = useCallback(
    async (email: string, jobId?: string) => {
      const redirectURI = jobId ? `${window.location.origin}/redirect-callback/${jobId}` : `${window.location.origin}/redirect-callback`

      const did = await magic?.auth.loginWithMagicLink({ email, redirectURI });

      if (!did) {
        return
      }

      const res = await authenticateUser({ input: { did } })

      setToken(res.data?.authenticateUser.token)
    },
    [setToken]
  )

  const loginWithProvider = useCallback((provider: OAuthProvider, jobId?: string) =>
    new Promise((resolve) => {
      window.addEventListener("popstate", () => {
        resolve(true);
      });

      const redirectURI = jobId ? `${window.location.origin}/oauth-callback/${jobId}` : `${window.location.origin}/oauth-callback`

      magic?.oauth.loginWithRedirect({
        provider,
        redirectURI,
      });
    })
    , [])

  const authenticateUserFromOAuth = useCallback(async () => {
    const magicRes = await magic?.oauth.getRedirectResult()

    const did = magicRes?.magic.idToken

    if (!did) {
      return
    }

    const firstName = magicRes?.oauth.userInfo.givenName
    const lastName = magicRes?.oauth.userInfo.familyName

    const accessToken = magicRes?.oauth.accessToken
    const fk = magicRes?.oauth.userHandle
    const provider = magicRes?.oauth.provider

    const res = await authenticateUser({ input: { did, firstName, lastName, accessToken, fk, provider } })

    setToken(res.data?.authenticateUser.token)
  }, [])

  const authenticateUserFromRedirect = useCallback(async () => {
    const did = await magic?.auth.loginWithCredential();

    return did
  }, [])

  const authenticateUserFromDid = useCallback(async (did: string) => {
    const res = await authenticateUser({ input: { did } })

    setToken(res.data?.authenticateUser.token)
  }, [])


  const refreshToken = useCallback(
    async () => {
      const did = await magic?.user.getIdToken();

      if (!did) {
        return
      }

      const res = await authenticateUser({ input: { did } })

      setToken(res.data?.authenticateUser.token)
    },
    [setToken]
  )

  const logout = useCallback(() => {
    setToken(undefined)

    magic?.user.logout()
  }, [setToken])

  const isUserLoggedin = useMemo(
    () => Boolean(token),
    [token]
  )

  const claims = useMemo(() => token ? jwtDecode<JWTClaims>(token) : undefined, [token])

  const companyId = claims && claims.companyRoles[0] && claims.companyRoles[0].companyId

  const hasCompany = Boolean(companyId)

  return { login, logout, setToken, hasCompany, companyId, isUserLoggedin, token, refreshToken, authenticateUserFromOAuth, authenticateUserFromRedirect, loginWithProvider, authenticateUserFromDid }
}
