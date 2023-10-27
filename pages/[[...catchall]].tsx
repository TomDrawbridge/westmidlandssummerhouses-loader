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
import { request, gql } from 'graphql-request';
import Head from 'next/head'

const allFetchDynamicPaths = require('../utils/fetchDynamicPaths');

const { DYNAMIC_PATHS_SOURCE = 'default' } = process.env;

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
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageParams={pageMeta.params}
      pageQuery={router.query}
      >

          <Analytics />
          <Head>
            <link rel="icon" href={`/icons/${process.env.NEXT_PUBLIC_FAVICON}`} />
            
            {/* Adding the script here */}
          </Head>

      <PlasmicComponent component={pageMeta.displayName} />
          

    </PlasmicRootProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};
  const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!plasmicData) {
    // non-Plasmic catch-all
    return { props: {} };
  }
  const pageMeta = plasmicData.entryCompMetas[0];
  // Cache the necessary data fetched for the page
  const queryCache = await extractPlasmicQueryData(
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      pageParams={pageMeta.params}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );
  // Use revalidate if you want incremental static regeneration
  return { props: { plasmicData, queryCache }, revalidate: 60 };
}

export const getStaticPaths: GetStaticPaths = async () => {
  let dynamicPaths = [];

  // Check if fetchDynamicPaths is a function before calling it
  if (typeof fetchDynamicPaths === 'function') {
    dynamicPaths = await fetchDynamicPaths();
  }

  const pageModules = await PLASMIC.fetchPages();

  // Start with the static paths from Plasmic
  const paths = pageModules.map((mod) => ({
    params: {
      catchall: mod.path.substring(1).split("/"),
    },
  }));

  // Only add dynamic paths if they exist
  if (dynamicPaths && dynamicPaths.length > 0) {
    paths.push(
      ...dynamicPaths.map((path: string) => ({
        params: {
          catchall: path.substring(1).split("/"),
        },
      }))
    );
  }

  return {
    paths,
    fallback: "blocking",
  };
};
