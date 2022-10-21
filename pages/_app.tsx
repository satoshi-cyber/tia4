import { AppProps } from "next/app";
import { Provider } from "urql";

import "../styles/globals.css";
import { useHook, client } from "../lib";
import { AuthService } from "../services";

function MyApp({ Component, pageProps }: AppProps) {
  useHook([AuthService.redirect]);

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
