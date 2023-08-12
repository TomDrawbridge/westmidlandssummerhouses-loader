// utils/fetchDynamicPaths.js

const { request, gql } = require('graphql-request');

const ENDPOINT = 'https://cloud.caisy.io/api/v3/e/856911e2-e7e3-4a7a-bd7a-274d7ab2a6ae/graphql';
const headers = {
    "x-caisy-apikey": "flCSpcFI7TMgpIWOxHkIVbunAPi4UwUm"
};

async function fetchDynamicPaths() {
    // Fetch service data
    const SERVICE_QUERY = gql`
    query {
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

    const serviceData = await request(ENDPOINT, SERVICE_QUERY, undefined, headers);

    const servicePaths = serviceData.allService.edges.map((edge) => {
        return `/services/${edge.node.servicecategory.slug}/${edge.node.pageSlug}`;
    });

    // Fetch category data
    const CATEGORY_QUERY = gql`
    query {
      allProductServiceCategory {
        edges {
          node {
            categoryName
          }
        }
      }
    }
  `;

    const categoryData = await request(ENDPOINT, CATEGORY_QUERY, undefined, headers);

    const categoryPaths = categoryData.allProductServiceCategory.edges.map((edge) => {
        return `/services/${edge.node.categoryName}`;
    });

    return [...servicePaths, ...categoryPaths];
}

module.exports = fetchDynamicPaths;
