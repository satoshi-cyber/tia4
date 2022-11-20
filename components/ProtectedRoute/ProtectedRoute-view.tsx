import React, { useEffect } from 'react'
import Router from 'next/router'

import { ProtectedRouteProps } from './ProtectedRoute-types'

import { useUser } from '../../hooks'
import { URLS } from '@/config'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isUserLoggedin } = useUser()

  useEffect(() => {
    if (!isUserLoggedin) {
      Router.replace(URLS.CREATE_A_JOB)
    }
  }, [isUserLoggedin])

  return <>{children}</>
}

export default ProtectedRoute
