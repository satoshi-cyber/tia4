import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { Cookies, CookiesProvider } from 'react-cookie';

const withCookies = <P extends { cookies: any }>(
  WrappedComponent: NextPage<P>
) => {
  const EnhancedComponent = ({ cookies, ...restProps }: P) => {
    const isBrowser = typeof window !== 'undefined';

    return (
      <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
        <WrappedComponent {...(restProps as P)} />
      </CookiesProvider>
    );
  };

  EnhancedComponent.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = new Cookies(ctx.req?.headers.cookie);

    const wrappedComponentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...wrappedComponentProps, cookies };
  };

  return EnhancedComponent;
};

export default withCookies;
