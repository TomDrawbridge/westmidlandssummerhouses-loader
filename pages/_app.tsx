import type { AppProps } from 'next/app'
import { clashGrotesk, satoshi } from '../lib/fonts'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${clashGrotesk.variable} ${satoshi.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}