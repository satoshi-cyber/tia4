import { createContext } from 'react'

interface AuthProviderContext {
  setToken: (value: string | undefined) => void
  token: string | undefined
}

export const AuthContext = createContext<AuthProviderContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => { },
  token: undefined,
})
