import * as React from "react";
import {
  PlasmicComponent,
  extractPlasmicQueryData,
  ComponentRenderData,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Analytics } from '@vercel/analytics/react';
import Error from "next/error";
import { useRouter } from "next/router";
import { PLASMIC } from "@/plasmic-init";
import Head from 'next/head';
import Script from 'next/script'; // Import the Script component

const allFetchDynamicPaths = require('../utils/fetchDynamicPaths');

const { DYNAMIC_PATHS_SOURCE = 'default', NEXT_PUBLIC_GTM_ID, NODE_ENV, NEXT_PUBLIC_FAVICON } = process.env;

const fetchDynamicPaths = allFetchDynamicPaths[`fetchDynamicPaths_${DYNAMIC_PATHS_SOURCE}`] || allFetchDynamicPaths.fetchDynamicPaths_default;

export default function PlasmicLoaderPage(props: {
  plasmicData?: ComponentRenderData;
  queryCache?: Record<string, any>;
}) {
  const { plasmicData, queryCache } = props;
  const router = useRouter();
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }
  const pageMeta = plasmicData.entryCompMetas[0];
  return (
    <>
      <Head>
        <link rel="icon" href={`/icons/${NEXT_PUBLIC_FAVICON}`} />
      </Head>
      {NODE_ENV === 'production' && (
        <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${NEXT_PUBLIC_GTM_ID}');`
        }} />
      )}
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        prefetchedQueryData={queryCache}
        pageParams={pageMeta.params}
        pageQuery={router.query}
      >
        {NODE_ENV === 'production' && (
          <noscript dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}></noscript>
        )}
        <Analytics />
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicRootProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};
  const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!plasmicData) {
    return { props: {} }; // non-Plasmic catch-all
  }
  const pageMeta = plasmicData.entryCompMetas[0];
  const queryCache = await extractPlasmicQueryData(
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      pageParams={pageMeta.params}
      pageRoute={pageMeta.path}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );
  return { props: { plasmicData, queryCache }, revalidate: 60 };
}

export const getStaticPaths: GetStaticPaths = async () => {
  let dynamicPaths = [];
  if (typeof fetchDynamicPaths === 'function') {
    dynamicPaths = await fetchDynamicPaths();
  }
  const pageModules = await PLASMIC.fetchPages();
  const paths = pageModules.map((mod) => ({
    params: { catchall: mod.path.substring(1).split("/") },
  }));
  if (dynamicPaths && dynamicPaths.length > 0) {
    paths.push(
      ...dynamicPaths.map((path: string) => ({
        params: { catchall: path.substring(1).split("/") },
      }))
    );
  }
  return { paths, fallback: "blocking" };
};
