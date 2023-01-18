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
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
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
