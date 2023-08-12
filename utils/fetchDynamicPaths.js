const { request, gql } = require('graphql-request');

async function fetchDynamicPaths() {
    const ENDPOINT = 'https://cloud.caisy.io/api/v3/e/856911e2-e7e3-4a7a-bd7a-274d7ab2a6ae/graphql';

    const GET_ALL_SERVICES = gql`
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

    const GET_ALL_CATEGORIES = gql`
    query MyQuery {
      allProductServiceCategory {
        edges {
          node {
            categoryName
          }
        }
      }
    }
  `;

    const headers = {
        "x-caisy-apikey": "flCSpcFI7TMgpIWOxHkIVbunAPi4UwUm"
    };

    const serviceData = await request(ENDPOINT, GET_ALL_SERVICES, undefined, headers);
    const categoryData = await request(ENDPOINT, GET_ALL_CATEGORIES, undefined, headers);

    const servicePaths = serviceData.allService.edges.map(edge => `/services/${edge.node.servicecategory.slug}/${edge.node.pageSlug}`);
    const categoryPaths = categoryData.allProductServiceCategory.edges.map(edge => `/services/${edge.node.categoryName}`);

    return [...servicePaths, ...categoryPaths];
}

module.exports = async () => {
    const dynamicPaths = await fetchDynamicPaths();

    return {
        siteUrl: process.env.SITE_URL || 'https://www.1hire.co.uk',
        generateRobotsTxt: true,
        extraPaths: dynamicPaths,
        // ...other options
    };
};
