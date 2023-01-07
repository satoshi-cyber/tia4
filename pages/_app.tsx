import App, { AppContext, AppProps } from 'next/app';
import { Cookies, CookiesProvider } from 'react-cookie';
import { Provider } from 'urql';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, Menu } from '@/components';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../styles/globals.css';
import { client } from '../lib';

function MyApp({
  Component,
  pageProps,
  cookies,
}: AppProps & { cookies: string }) {
  const isBrowser = typeof window !== 'undefined';

  return (
    <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
      <Provider value={client}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
          <Menu />
          <ToastContainer />
        </AuthProvider>
      </Provider>
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // Next.js 11 & 12
  return { ...appProps, cookies: appContext.ctx.req?.headers.cookie };
  // Next.js 12 only
  // return { ...appProps, cookies: appContext.ctx.req?.cookies }
};

export default MyApp;
