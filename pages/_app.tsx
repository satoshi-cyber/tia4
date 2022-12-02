import { AppProps } from 'next/app'
import { Provider } from 'urql'
import { ToastContainer } from 'react-toastify'
import AuthProvider from '@/components/AuthProvider'

import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import '../styles/globals.css'
import { client } from '../lib'

// import { AuthService } from '../services'

function MyApp({ Component, pageProps }: AppProps) {
  // useHook([AuthService.redirect])

  return (
    <Provider value={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
