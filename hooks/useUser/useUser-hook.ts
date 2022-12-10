import { Magic } from "magic-sdk";
import { useCallback, useContext, useMemo } from "react";
import { OAuthExtension, OAuthProvider, OAuthRedirectResult } from "@magic-ext/oauth";
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
    async (email: string) => {
      const did = await magic?.auth.loginWithMagicLink({ email });

      if (!did) {
        return
      }

      const res = await authenticateUser({ input: { did } })

      setToken(res.data?.authenticateUser.token)
    },
    [setToken]
  )

  const loginWithProvider = useCallback((provider: OAuthProvider) =>
    new Promise((resolve) => {
      window.addEventListener("popstate", () => {
        resolve(true);
      });

      magic?.oauth.loginWithRedirect({
        provider,
        redirectURI: `${window.location.origin}/oauth-callback`,
      });
    })
    , [])


  const getAvatar = useCallback(async (response: OAuthRedirectResult) => {
    if (response.oauth.provider === 'facebook') {
      const res = await fetch(`https://graph.facebook.com/${response.oauth.userInfo.sub}?fields=picture.width(800).height(800)&access_token=${response.oauth.accessToken}`)

      const data = await res.json()

      return data?.picture.data.url
    }

    if (response.oauth.provider === 'linkedin') {
      const res = await fetch(`https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))&oauth2_access_token=${response.oauth.accessToken}`)

      const data = await res.json()

      return data.profilePicture["displayImage~"].elements.at(-1).identifiers[0].identifier
    }

    return null
  }, [])

  const authenticateUserFromOAuth = useCallback(async () => {
    const magicRes = await magic?.oauth.getRedirectResult()

    const did = magicRes?.magic.idToken

    if (!did) {
      return
    }

    const firstName = magicRes?.oauth.userInfo.givenName
    const lastName = magicRes?.oauth.userInfo.familyName

    const avatarUrl = await getAvatar(magicRes)

    console.log({ magicRes, avatarUrl })

    const res = await authenticateUser({ input: { did, firstName, lastName, avatarUrl } })

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

  return { login, logout, hasCompany, companyId, isUserLoggedin, token, refreshToken, authenticateUserFromOAuth, loginWithProvider }
}
