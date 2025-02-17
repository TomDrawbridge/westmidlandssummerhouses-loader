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
import Head from 'next/head'
import * as allFetchDynamicPaths from '../utils/fetchDynamicPaths';

const { DYNAMIC_PATHS_SOURCE = 'default' } = process.env;

const fetchDynamicPaths = (allFetchDynamicPaths as any)[`fetchDynamicPaths_${DYNAMIC_PATHS_SOURCE}`] || allFetchDynamicPaths.fetchDynamicPaths_default;

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
<Analytics/>
      <Head>
        <meta property="og:site_name" content="West Midlands Summerhouses" />
        {/* You might want to add other OpenGraph tags here */}
        <meta property="og:type" content="website" />
        <link 
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@1&display=swap"
        />
        <link 
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap"
        />
      </Head>
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageParams={pageMeta.params}
      pageQuery={router.query}
    >
      <Analytics />
      <Head>
            <link rel="icon" href="/favicon.ico" />
      </Head>
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
    return { props: {} };
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
  
  return { props: { plasmicData, queryCache }, revalidate: 3600 };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageModules = await PLASMIC.fetchPages();
  const staticPaths = pageModules.map((mod) => ({
    params: {
      catchall: mod.path.substring(1).split("/"),
    },
  }));

  let dynamicPaths: string[] = [];
  if (typeof fetchDynamicPaths === 'function') {
    try {
      dynamicPaths = await fetchDynamicPaths();
    } catch (error) {
      console.error('Error fetching dynamic paths:', error);
    }
  }

  const allPaths = [
    ...staticPaths,
    ...dynamicPaths.map((path: string) => ({
      params: {
        catchall: path.substring(1).split("/"),
      },
    }))
  ];

  return {
    paths: allPaths,
    fallback: "blocking",
  };
};
