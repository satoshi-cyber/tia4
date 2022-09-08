import "../styles/globals.css";
import { useHook } from "../lib";
import { AuthService } from "../services";

function MyApp({ Component, pageProps }) {
  useHook([AuthService.redirect]);

  return <Component {...pageProps} />;
}

export default MyApp;
