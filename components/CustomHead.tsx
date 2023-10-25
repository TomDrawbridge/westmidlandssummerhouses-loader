import React from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';

interface CustomHeadProps {
  mycodehere: string;
  measurementId: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ mycodehere, measurementId }) => {
  return (
    <Head>
      {parse(mycodehere)}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </Head>
  );
};

export default CustomHead;
