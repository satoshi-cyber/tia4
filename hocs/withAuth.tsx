import { Cookies } from 'react-cookie'
import { NextPage } from 'next'
import { URLS } from '@/config'
import Router from 'next/router'
import React from 'react'

const withAuth = <P extends object>(Page: NextPage<P>) => {
  return class extends React.Component<P> {
    static async getInitialProps(ctx: any) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {}

      const cookies = new Cookies(ctx.req?.headers.cookie)

      if (!cookies.get('token')) {
        if (typeof window === 'undefined') {
          ctx.res.writeHead(302, { Location: URLS.LOGIN })
          ctx.res.end()
        } else {
          Router.push(URLS.LOGIN)
        }
      }

      return { ...pageProps, cookies }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

export default withAuth
