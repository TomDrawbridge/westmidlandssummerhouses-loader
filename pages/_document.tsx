import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical resource hints - order matters for performance */}
        <link rel="preconnect" href="https://cms.westmidlandssummerhouses.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />

        {/* DNS prefetch for less critical resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="//code.tidio.co" />

        {/* Preload critical fonts - these should match your actual font files */}
        <link
          rel="preload"
          href="/fonts/ClashGrotesk-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload critical above-the-fold images - uncomment and update paths as needed */}
        {/* <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" /> */}

        {/* Essential meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />

        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        {/* Performance hints for Next.js chunks */}
          <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
          <link rel="modulepreload" href="/_next/static/chunks/framework.js" />
          <link rel="modulepreload" href="/_next/static/chunks/main.js" />
          <link rel="modulepreload" href="/_next/static/chunks/pages/_app.js" />
      </Head>
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus-visible">
          Skip to main content
        </a>

        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC3DBJHL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}