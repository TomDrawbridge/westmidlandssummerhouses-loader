import dynamic from 'next/dynamic';
import Script from 'next/script';

// Analytics configuration
const ANALYTICS_CONFIG = {
  GTM_ID: 'GTM-NC3DBJHL',
  META_PIXEL_ID: '1009317356826134',
};

// Dynamic Analytics Components
const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/next").then(mod => ({ default: mod.Analytics })),
  { ssr: false }
);

const VercelSpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then(mod => ({ default: mod.SpeedInsights })),
  { ssr: false }
);

const DynamicTidio = dynamic(
  () => import('./Tidio'),
  { 
    ssr: false,
    loading: () => null // No loading state needed for chat widget
  }
);

interface AnalyticsProviderProps {
  isProduction?: boolean;
  tidioId?: string;
}

export default function AnalyticsProvider({ 
  isProduction = process.env.NODE_ENV === 'production',
  tidioId = 'jf4jq5gvgkplzoligz95ethso5rk59e0'
}: AnalyticsProviderProps) {
  if (!isProduction) {
    return (
      <>
        <VercelAnalytics />
        <VercelSpeedInsights />
      </>
    );
  }

  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
      
      <DynamicTidio
        tidioId={tidioId}
        loadStrategy="idle"
      />

      {/* Google Tag Manager */}
      <Script
        id="gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${ANALYTICS_CONFIG.GTM_ID}`}
        strategy="afterInteractive"
      />

      {/* Meta Pixel */}
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
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            try {
              fbq('init', '${ANALYTICS_CONFIG.META_PIXEL_ID}');
              fbq('track', 'PageView');
            } catch(e) {
              console.warn('Meta Pixel failed to load:', e);
            }
          `
        }}
      />
    </>
  );
}
