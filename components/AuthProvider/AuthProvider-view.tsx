import React, { useCallback } from 'react'
import { useCookies } from 'react-cookie'

import { AuthContext } from './AuthProvider-context'
import { AuthProviderProps } from './AuthProvider-types'

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [{ token }, setCookie, removeCookie] = useCookies(['token'])

  const setToken = useCallback((token?: string) => {
    if (!token) {
      removeCookie('token')

      return
    }

    setCookie('token', token)
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
