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
      <PlasmicComponent component={pageMeta.displayName} />
<Analytics />

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

type ServiceNode = {
  pageSlug: string;
  servicecategory: {
    slug: string;
  };
};

type ServiceData = {
  allService: {
    edges: {
      node: ServiceNode;
    }[];
  };
};


export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await PLASMIC.fetchPages();

  const ENDPOINT = 'https://cloud.caisy.io/api/v3/e/856911e2-e7e3-4a7a-bd7a-274d7ab2a6ae/graphql';

  const GET_ALL_PATHS = gql`
    query MyQuery {
      allService {
        edges {
          node {
            pageSlug
            servicecategory {
              slug
            }
          }
        }
      }
    }
  `;

  const headers = {
    "x-caisy-apikey": "flCSpcFI7TMgpIWOxHkIVbunAPi4UwUm"
  };

  const data = await request(ENDPOINT, GET_ALL_PATHS, undefined, headers) as ServiceData;


  const graphqlPaths = data.allService.edges.map((edge) => {
    return {
      params: {
        catchall: ['services', edge.node.servicecategory.slug, edge.node.pageSlug]
      }
    };
  });

  return {
    paths: [
      ...pages.map((page) => ({
        params: { catchall: page.path.substring(1).split('/') }
      })),
      ...graphqlPaths,
    ],
    fallback: 'blocking'
  };
};