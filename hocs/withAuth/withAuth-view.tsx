import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { Cookies, CookiesProvider } from 'react-cookie';
import { DOMAIN, URLS } from '@/config';
import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import Router from 'next/router';
import nextBase64 from 'next-base64';

const withAuth = <P extends Object>(WrappedComponent: NextPage<P>) => {
  const EnhancedComponent = ({ cookies, ...restProps }: any) => {
    const router = useRouter();
    const { isUserLoggedin } = useUser();
    const isBrowser = typeof window !== 'undefined';

    const from = nextBase64.encode(`${DOMAIN}${router.asPath}`);

    const url = `${URLS.LOGIN}?from=${from}`;

    useEffect(() => {
      if (!router.isReady) {
        return;
      }

      if (!isUserLoggedin) {
        Router.replace(url);
      }
    }, [isUserLoggedin, router.isReady]);

    return (
      <CookiesProvider cookies={isBrowser ? undefined : cookies}>
        <WrappedComponent {...(restProps as P)} />
      </CookiesProvider>
    );
  };

  EnhancedComponent.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = new Cookies(ctx.req?.headers.cookie);

    const from = nextBase64.encode(`${DOMAIN}${ctx.asPath}`);

    const url = `${URLS.LOGIN}?from=${from}`;

    if (!cookies || !cookies.get(TOKEN_COOKIE_KEY)) {
      if (ctx.res && ctx.res.writeHead) {
        ctx.res.writeHead(302, {
          Location: url,
        });
        ctx.res.end();
      }
    }

    const wrappedComponentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...wrappedComponentProps, cookies };
  };

  return EnhancedComponent;
};

export default withAuth;
