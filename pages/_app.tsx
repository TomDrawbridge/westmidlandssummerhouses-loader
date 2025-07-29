import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { clashGrotesk, satoshi, outfit } from '../lib/fonts'
import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


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
    
    // More accurate browser detection for truly outdated browsers
    const isUnsupportedBrowser = () => {
      const ua = navigator.userAgent;
      
      // Check for ES2017+ support features instead of user agent strings
      try {
        // Test for ES2017+ features
        new Function('async () => {}');
        if (!Array.prototype.includes || !Object.values || !Object.entries) {
          return true;
        }
        
        // Only show banner for truly ancient browsers
        // IE 11 and below
        if (ua.includes('Trident/') || ua.includes('MSIE ')) {
          return true;
        }
        
        // Very old Chrome (before 60)
        const chromeMatch = ua.match(/Chrome\/(\d+)/);
        if (chromeMatch && parseInt(chromeMatch[1]) < 60) {
          return true;
        }
        
        // Very old Firefox (before 52)
        const firefoxMatch = ua.match(/Firefox\/(\d+)/);
        if (firefoxMatch && parseInt(firefoxMatch[1]) < 52) {
          return true;
        }
        
        // Very old Safari (iOS < 10, macOS Safari < 10)
        if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
          // Check iOS version
          const iosMatch = ua.match(/OS (\d+)_/);
          if (iosMatch && parseInt(iosMatch[1]) < 10) {
            return true;
          }
          
          // Check macOS Safari version via WebKit version
          const webkitMatch = ua.match(/AppleWebKit\/(\d+)/);
          if (webkitMatch && parseInt(webkitMatch[1]) < 603) {
            return true;
          }
        }
        
        return false;
      } catch (e) {
        // If we can't even parse modern JavaScript, definitely unsupported
        return true;
      }
    };
    
    if (isUnsupportedBrowser()) {
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
    <div className={`${clashGrotesk.variable} ${satoshi.variable} ${outfit.variable}`}>
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
<Analytics />
<SpeedInsights />

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

          {/* Meta Pixel - Load after interaction */}
          <Script
            id="meta-pixel"
            strategy="lazyOnload"
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

          {/* Tidio Chat - Load only after user interaction */}
          <Script
            id="tidio-chat"
            strategy="worker"
            onLoad={() => {
              // Only load after user interaction
              let interacted = false;
              const loadTidio = () => {
                if (!interacted) {
                  interacted = true;
                  const script = document.createElement('script');
                  script.src = `//code.tidio.co/${ANALYTICS_CONFIG.TIDIO_ID}.js`;
                  script.async = true;
                  document.head.appendChild(script);
                }
              };
              ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
                document.addEventListener(event, loadTidio, { once: true, passive: true });
              });
            }}
          />
        </>
      )}
    </div>
  )
}