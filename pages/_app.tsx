import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { clashGrotesk, satoshi, outfit } from '../lib/fonts'
import '../styles/globals.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { PlasmicRootProvider } from "@plasmicapp/loader-nextjs"
import { PLASMIC } from "@/plasmic-init"

// Dynamic imports for heavy components
const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), {
  ssr: false
});

const NavigationDebugger = dynamic(() => import('../components/NavigationDebugger'), {
  ssr: false // Debug components don't need SSR
});

// Analytics configuration - moved to AnalyticsProvider
const isProduction = process.env.NODE_ENV === 'production';

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

  return (
    <div className={`${clashGrotesk.variable} ${satoshi.variable} ${outfit.variable}`}>
      <Head>
        {/* Essential viewport configuration */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=1009317356826134&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </Head>

      <PlasmicRootProvider loader={PLASMIC}>
        <Component {...pageProps} />
        <AnalyticsProvider isProduction={isProduction} />
        <NavigationDebugger />
      </PlasmicRootProvider>
    </div>
  )
}