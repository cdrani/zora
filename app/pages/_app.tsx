import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { enableStaticRendering } from 'mobx-react-lite';

const isServer = typeof window === 'undefined'

enableStaticRendering(isServer);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
