import { Magic } from "magic-sdk";
import { useCallback, useContext, useMemo } from "react";
import { OAuthExtension } from "@magic-ext/oauth";

import { AuthContext } from '../../components/AuthProvider'

const magic =
  typeof window !== 'undefined' ?
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!, {
      extensions: [new OAuthExtension()],
    }) : undefined


export const useUser = () => {
  const { token, setToken } = useContext(AuthContext)

  const login = useCallback(
    async (email: string) => {
      const did = await magic?.auth.loginWithMagicLink({ email });

      setToken(did || undefined)
    },
    [setToken]
  )

  const logout = useCallback(() => {
    magic?.user.logout().then(() => {
      setToken(undefined)
    })
  }, [setToken])

  const isUserLoggedin = useMemo(
    () => Boolean(token),
    [token]
  )

  return { login, logout, isUserLoggedin, token }
}
