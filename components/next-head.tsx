// components/CustomHead.js
import Head from 'next/head';

const CustomHead = () => {
  const GA4_ID = process.env.GA4_ID;

  return (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}');
          `
        }}
      ></script>
    </Head>
  );
};

export default CustomHead;
