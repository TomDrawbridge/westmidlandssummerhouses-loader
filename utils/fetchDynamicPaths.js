const { request, gql } = require('graphql-request');

async function fetchDynamicPaths_1Hire() {
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

    const result = [...servicePaths, ...categoryPaths];
    console.log("Result from fetchDynamicPaths:", result);
    return result.length ? result : [];

}

const axios = require('axios');

async function fetchDynamicPaths_WMSH() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    const TOKEN = process.env.DIRECTUS_TOKEN;
    const headers = TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {};

    try {
        // Fetch blog posts ID list
        const blogPostsResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts?filter[Organisation][_eq]=1`, { headers });
        const blogPostsIds = blogPostsResponse.data.data.map(post => post.id) || [];

        // Fetch individual blog posts and generate paths
        const blogPostPaths = [];
        for (const postId of blogPostsIds) {
            const postResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts/${postId}`, { headers });
            const slug = postResponse.data.data.slug;
            blogPostPaths.push(`/blog-post/${slug}`);
        }

// Fetch services ID list and generate paths
        const servicesResponse = await axios.get(`${ENDPOINT}/items/Services?filter[Organisation][_eq]=1`, { headers });
        const servicesIds = servicesResponse.data.data.map(service => service.id) || [];
        const servicePaths = [];
        for (const serviceId of servicesIds) {
            const serviceResponse = await axios.get(`${ENDPOINT}/items/Services/${serviceId}`, { headers });
            const slug = serviceResponse.data.data.slug;
            servicePaths.push(`/garden-buildings/${slug}`);
        }

        // Fetch case studies ID list and generate paths
        const caseStudiesResponse = await axios.get(`${ENDPOINT}/items/case_studies?filter[Organisation][_eq]=1`, { headers });
        const caseStudiesIds = caseStudiesResponse.data.data.map(study => study.id) || [];
        const caseStudyPaths = [];
        for (const caseStudyId of caseStudiesIds) {
            const caseStudyResponse = await axios.get(`${ENDPOINT}/items/case_studies/${caseStudyId}`, { headers });
            const slug = caseStudyResponse.data.data.slug;
            caseStudyPaths.push(`/case-studies/${slug}`);
        }

        // Combine and return result
        const result = [...blogPostPaths, ...servicePaths, ...caseStudyPaths];
        console.log("Result from fetchDynamicPaths:", result);
        return result.length ? result : [];

    } catch (error) {
        console.error('Error fetching data from Directus:', error);
        return [];
    }
}


module.exports = {
    fetchDynamicPaths_1Hire,
    fetchDynamicPaths_WMSH
};
