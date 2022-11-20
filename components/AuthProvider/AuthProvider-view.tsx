import React from 'react'
import useLocalStorage from 'use-local-storage'

import { LOCAL_STORAGE_KEY } from './AuthProvider-constants'
import { AuthContext } from './AuthProvider-context'
import { AuthProviderProps } from './AuthProvider-types'

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEY,
    undefined
  )

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
