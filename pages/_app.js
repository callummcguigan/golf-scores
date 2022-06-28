import '../styles/globals.css'
import { AuthContextProvider } from '../store/auth-context.js'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }) {
  return (
  <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
  )
}

export default MyApp
