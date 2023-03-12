import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'urql';
import { ToastContainer } from 'react-toastify';
import Menu from '@/components/Menu';
import AuthProvider from '@/components/AuthProvider';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../styles/globals.css';
import { client } from '../lib';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Head>
        <meta property="og:title" content="The Interview" />
        <title>The Interview</title>
        <meta
          property="og:description"
          content="Revolutionize the way you hire."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://theinterview.io/og.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <Analytics />
        <Menu />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
