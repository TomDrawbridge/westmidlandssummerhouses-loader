import type { AppProps } from 'next/app'
import { clashGrotesk, satoshi, inter, outfit, inconsolata } from '../lib/fonts'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${clashGrotesk.variable} ${satoshi.variable} ${inter.variable} ${outfit.variable} ${inconsolata.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}