import { AppProps } from 'next/app'
import { Provider } from 'urql'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import '../styles/globals.css'
import { useHook, client } from '../lib'
import { AuthService } from '../services'

function MyApp({ Component, pageProps }: AppProps) {
  useHook([AuthService.redirect])

  return (
    <Provider value={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
