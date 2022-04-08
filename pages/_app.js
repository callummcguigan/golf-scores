import '../styles/globals.css'
import { AuthContextProvider } from '../store/auth-context.js'

function MyApp({ Component, pageProps }) {
  return (
  <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
  )
}

export default MyApp
