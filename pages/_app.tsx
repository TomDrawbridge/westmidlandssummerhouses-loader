import '../styles/globals.css';
import localFont from 'next/font/local'
import * as React from 'react';
import type { AppProps } from 'next/app';

const BelgianoCustom = localFont({
  src: '../public/fonts/BelgianoSerif-Regular.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--BelgianoCustom'
});

export default function MyApp({ Component, pageProps }: AppProps) {
  // Set the CSS variable on <body> to ensure Plasmic Studio has access to the variable.
  React.useEffect(() => {
    document.body.classList.add(BelgianoCustom.variable);
  }, []);
  return <Component {...pageProps} />;
}


