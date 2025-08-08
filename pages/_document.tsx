import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />

        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />


      </Head>
      <body>
        {/* Show content after styles load */}
        <Script
          id="fouc-reveal"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Wait for styles to load
                setTimeout(function() {
                  document.body.style.visibility = 'visible';
                  document.body.style.opacity = '1';
                }, 50);
              });
              
              // Fallback for very slow connections
              window.addEventListener('load', function() {
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
              });
            `
          }}
        />

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