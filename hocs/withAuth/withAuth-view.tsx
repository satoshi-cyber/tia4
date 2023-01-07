import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { Cookies } from 'react-cookie';
import { URLS } from '@/config';
import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import Router from 'next/router';

const withAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
  const EnhancedComponent = (props: P) => {
    const router = useRouter();
    const { isUserLoggedin } = useUser();

    const query = router.query;

    const url = query.applyJobId
      ? `${URLS.LOGIN}?jobId=${query.applyJobId}`
      : URLS.LOGIN;

    useEffect(() => {
      if (!isUserLoggedin) {
        Router.replace(url);
      }
    }, [isUserLoggedin]);

    return <WrappedComponent {...(props as P)} />;
  };

  EnhancedComponent.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = new Cookies(ctx.req?.headers.cookie);

    const query = ctx.query;

    const url = query.applyJobId
      ? `${URLS.LOGIN}?jobId=${query.applyJobId}`
      : URLS.LOGIN;

    if (!cookies || !cookies.get(TOKEN_COOKIE_KEY)) {
      if (ctx.res) {
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
