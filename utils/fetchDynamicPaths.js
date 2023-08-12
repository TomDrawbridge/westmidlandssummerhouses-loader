const { request, gql } = require('graphql-request');

const ENDPOINT = 'https://cloud.caisy.io/api/v3/e/856911e2-e7e3-4a7a-bd7a-274d7ab2a6ae/graphql';
const headers = {
    "x-caisy-apikey": "flCSpcFI7TMgpIWOxHkIVbunAPi4UwUm"
};

async function fetchDynamicPaths() {
    try {
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
        }`;

        const serviceData = await request(ENDPOINT, SERVICE_QUERY, undefined, headers);

        // Log the service data
        console.log("Service Data:", serviceData);

        const servicePaths = serviceData.allService.edges.map((edge) => {
            return `/services/${edge.node.servicecategory.slug}/${edge.node.pageSlug}`;
        });

        // Log the service paths
        console.log("Service Paths:", servicePaths);

        // Fetch category data
        const CATEGORY_QUERY = gql`
        query {
            allProductServiceCategory {
                edges {
                    node {
                        slug
                    }
                }
            }
        }`;

        const categoryData = await request(ENDPOINT, CATEGORY_QUERY, undefined, headers);

        // Log the category data
        console.log("Category Data:", categoryData);

        const categoryPaths = categoryData.allProductServiceCategory.edges.map((edge) => {
            return `/services/${edge.node.slug}`;
        });

        // Log the category paths
        console.log("Category Paths:", categoryPaths);

        return [...servicePaths, ...categoryPaths];

    } catch (error) {
        // Log any error that occurs
        console.error("Error fetching paths:", error);
        return [];
    }
}

module.exports = fetchDynamicPaths;
