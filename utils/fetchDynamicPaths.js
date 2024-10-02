const axios = require('axios');

async function fetchDynamicPaths_WMSH() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    const TOKEN = process.env.DIRECTUS_TOKEN;
    const headers = TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {};

    try {
        const response = await axios.get(`${ENDPOINT}/items/Blog_Posts`, {
            headers,
            params: {
                filter: { status: { _eq: 'published' } },
                fields: ['id', 'slug'],
            }
        });

        const blogPostPaths = response.data.data.map((post) => `/blog/post/${post.slug}`);
        
        console.log("Dynamic paths fetched:", blogPostPaths);
        return blogPostPaths;
    } catch (error) {
        console.error('Error fetching data from Directus:', error);
        return [];
    }
}

function fetchDynamicPaths_default() {
    return Promise.resolve([]);
}

module.exports = {
    fetchDynamicPaths_WMSH,
    fetchDynamicPaths_default
};