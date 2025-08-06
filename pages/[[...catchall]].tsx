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
  
  // Debug logging
  console.log('🎯 [PAGE] PlasmicLoaderPage rendering:', {
    pathname: router.pathname,
    asPath: router.asPath,
    query: router.query,
    hasPlasmicData: !!plasmicData,
    entryCompMetas: plasmicData?.entryCompMetas?.length || 0,
    componentName: plasmicData?.entryCompMetas?.[0]?.displayName || 'none'
  });
  
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    console.error('❌ [PAGE] No Plasmic data found, returning 404');
    return <Error statusCode={404} />;
  }
  
  const pageMeta = plasmicData.entryCompMetas[0];
  console.log('📄 [PAGE] Rendering component:', pageMeta.displayName);

  return (
   <>
<Analytics/>
      <Head>
        <meta property="og:site_name" content="West Midlands Summerhouses" />
        {/* You might want to add other OpenGraph tags here */}
        <meta property="og:type" content="website" />
      </Head>
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageParams={pageMeta.params}
      pageQuery={router.query}
      skipFonts={true}
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
  console.log('🎯 [getStaticProps] Starting for path:', context.params);
  
  const { catchall } = context.params ?? {};
  const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
  
  console.log('🎯 [getStaticProps] Plasmic path:', plasmicPath);
  
  try {
    const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
    console.log('🎯 [getStaticProps] Plasmic data fetched:', !!plasmicData);
    
    if (!plasmicData) {
      console.log('🎯 [getStaticProps] No Plasmic data found, returning empty props');
      return { props: {} };
    }
    
    const pageMeta = plasmicData.entryCompMetas[0];
    console.log('🎯 [getStaticProps] Page component:', pageMeta?.displayName);
    
    const queryCache = await extractPlasmicQueryData(
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        pageParams={pageMeta.params}
        pageRoute={pageMeta.path}
        skipFonts={true}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicRootProvider>
    );
    
    console.log('🎯 [getStaticProps] Query cache extracted, returning props');
    return { props: { plasmicData, queryCache }, revalidate: 3600 };
  } catch (error) {
    console.error('❌ [getStaticProps] Error:', error);
    return { props: {} };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('🛤️ [getStaticPaths] Starting...');
  
  try {
    const pageModules = await PLASMIC.fetchPages();
    console.log('🛤️ [getStaticPaths] Plasmic pages fetched:', pageModules.length);
    console.log('🛤️ [getStaticPaths] Plasmic pages:', pageModules.map(mod => mod.path));
    
    const staticPaths = pageModules.map((mod) => ({
      params: {
        catchall: mod.path.substring(1).split("/"),
      },
    }));

    let dynamicPaths: string[] = [];
    if (typeof fetchDynamicPaths === 'function') {
      try {
        dynamicPaths = await fetchDynamicPaths();
        console.log('🛤️ [getStaticPaths] Dynamic paths fetched:', dynamicPaths.length);
        console.log('🛤️ [getStaticPaths] Dynamic paths:', dynamicPaths);
      } catch (error) {
        console.error('❌ [getStaticPaths] Error fetching dynamic paths:', error);
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

    console.log('🛤️ [getStaticPaths] Total paths generated:', allPaths.length);
    console.log('🛤️ [getStaticPaths] All paths:', allPaths.map(p => '/' + (Array.isArray(p.params.catchall) ? p.params.catchall.join('/') : p.params.catchall)));

    return {
      paths: allPaths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error('❌ [getStaticPaths] Error:', error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};
