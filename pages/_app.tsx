import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { clashGrotesk, satoshi, inter, outfit, inconsolata } from '../lib/fonts'
import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'

// Analytics configuration
const ANALYTICS_CONFIG = {
  GA_ID: 'G-V1CSZ78BJ5',
  GTM_ID: 'GTM-NC3DBJHL',
  META_PIXEL_ID: '1009317356826134',
  GOOGLE_ADS_ID: 'AW-10884204090',
  TIDIO_ID: 'jf4jq5gvgkplzoligz95ethso5rk59e0'
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only run browser check in production
    if (process.env.NODE_ENV !== 'production') return;
    
    // Generate your regex with: npx browserslist-useragent-regexp
    const supportedBrowsers = /Chrome\/(1[3-9]\d|[2-9]\d\d)\.[\d.]+|Firefox\/(1[4-9]\d|[2-9]\d\d)\.[\d.]+|Safari\/(1[6-9]|[2-9]\d)\.[\d.]+|Edge\/(1[3-9]\d|[2-9]\d\d)\.[\d.]+/;
    
    if (!supportedBrowsers.test(navigator.userAgent)) {
      const banner = document.createElement('div');
      banner.id = 'unsupported-browser-banner';
      banner.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #dc2626;
          color: white;
          padding: 12px;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          z-index: 9999;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">
          <strong>Browser Not Supported:</strong> Please upgrade to a modern browser for the best experience.
          <button onclick="this.parentElement.parentElement.remove()" style="
            margin-left: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
          ">×</button>
        </div>
      `;
      
      document.body.insertBefore(banner, document.body.firstChild);
      document.body.style.paddingTop = '48px';
    }
  }, []);

  // Only load analytics in production
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className={`${clashGrotesk.variable} ${satoshi.variable} ${inter.variable} ${outfit.variable} ${inconsolata.variable}`}>
      <Head>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </Head>

      <Component {...pageProps} />

      {/* Structured Data */}
      <Script 
        id="structured-data" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "West Midlands Summer Houses",
            "alternateName": "West Midlands Summerhouses",
            "url": "https://westmidlandssummerhouses.com"
          })
        }}
      />

      {isProduction && (
        <>
          {/* Google Tag Manager - Load first as it can manage other tags */}
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');
              `
            }}
          />

          {/* Google Analytics - Only if not managed by GTM */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_CONFIG.GA_ID}');
              `
            }}
          />

          {/* Google Ads Conversion Tracking */}
          <Script
            id="google-ads"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${ANALYTICS_CONFIG.GOOGLE_ADS_ID}');
              `
            }}
          />

          {/* Meta Pixel */}
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${ANALYTICS_CONFIG.META_PIXEL_ID}');
                fbq('track', 'PageView');
              `
            }}
          />

          {/* Tidio Chat */}
          <Script
            src={`//code.tidio.co/${ANALYTICS_CONFIG.TIDIO_ID}.js`}
            strategy="afterInteractive"
          />
        </>
      )}
    </div>
  )
}