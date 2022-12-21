import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { Cookies } from 'react-cookie'
import { URLS } from '@/config'
import { TOKEN_COOKIE_KEY } from '@/config/auth'
import { useUser } from '@/hooks'
import Router from 'next/router'

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  const EnhancedComponent = (props: P) => {
    const { isUserLoggedin } = useUser()

    useEffect(() => {
      if (!isUserLoggedin) {
        Router.push(URLS.LOGIN)
      }
    }, [isUserLoggedin])

    return <WrappedComponent {...(props as P)} />
  }

  EnhancedComponent.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = new Cookies(ctx.req?.headers.cookie)

    const query = ctx.query

    console.log({ query })

    if (!cookies || !cookies.get(TOKEN_COOKIE_KEY)) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: URLS.LOGIN,
        })
        ctx.res.end()

        return
      }
    }

    const wrappedComponentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...wrappedComponentProps, cookies }
  }

  return EnhancedComponent
}

export default withAuth
