import { Magic } from "magic-sdk";
import { useCallback, useContext, useMemo } from "react";
import { OAuthExtension } from "@magic-ext/oauth";
import { useAuthenticateUserMutation } from "@/graphql";

import { AuthContext } from '../../components/AuthProvider'

export const useUser = () => {
  const { token, setToken } = useContext(AuthContext)

  const [_, authenticateUser] = useAuthenticateUserMutation()

  const magic =
    typeof window !== 'undefined' ?
      new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!, {
        extensions: [new OAuthExtension()],
      }) : undefined

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

  const logout = useCallback(() => {
    setToken(undefined)

    magic?.user.logout()
  }, [setToken])

  const isUserLoggedin = useMemo(
    () => Boolean(undefined),
    [token]
  )

  return { login, logout, isUserLoggedin, token }
}
