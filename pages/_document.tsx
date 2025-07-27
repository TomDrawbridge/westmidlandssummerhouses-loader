import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="//code.tidio.co/jf4jq5gvgkplzoligz95ethso5rk59e0.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Tidio chat auto-open script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function onTidioChatApiReady() {
                  (function() {
                      window.tidioChatApi.open();
                  })();
                }
                if (window.tidioChatApi) {
                  window.tidioChatApi.on("ready", onTidioChatApiReady);
                } else {
                  document.addEventListener("tidioChat-ready", onTidioChatApiReady);
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
