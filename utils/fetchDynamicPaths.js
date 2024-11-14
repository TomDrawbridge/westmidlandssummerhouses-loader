const axios = require('axios');

async function fetchDynamicPaths_WMSH() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    
    try {
        const [blogResponse, gardenResponse, materialsResponse] = await Promise.allSettled([
            axios.get(`${ENDPOINT}/items/Blog_Posts`, {
                params: {
                    filter: { status: { _eq: 'published' } },
                    fields: ['id', 'slug'],
                }
            }),
            axios.get(`${ENDPOINT}/items/garden_rooms`, {
                params: {
                    filter: { status: { _eq: 'published' } },
                    fields: ['url'],
                }
            }),
            axios.get(`${ENDPOINT}/items/base_materials`, {
                params: {
                    filter: { status: { _eq: 'published' } },
                    fields: ['id', 'slug'],
                }
            })
        ]);

        const blogPaths = blogResponse.status === 'fulfilled' 
            ? blogResponse.value.data.data.map(post => `/blog/post/${post.slug}`)
            : [];

        const gardenRoomPaths = gardenResponse.status === 'fulfilled'
            ? gardenResponse.value.data.data.map(room => `/garden-rooms/${room.url}`)
            : [];

        const materialPaths = materialsResponse.status === 'fulfilled'
            ? materialsResponse.value.data.data.map(material => `/base_materials/${material.slug}`)
            : [];
        
        const staticPaths = [
            '/about',
            '/contact',
            '/services',
            '/gallery',
            '/testimonials',
            '/blog',
            '/garden-rooms',
            '/case-studies',
            '/faqs',
            '/pricing',
            '/ground-screws',
            '/base_materials'
        ];
        
        return [...staticPaths, ...blogPaths, ...gardenRoomPaths, ...materialPaths];
    } catch (error) {
        console.error('Error in fetchDynamicPaths:', error);
        return staticPaths;
    }
}

function fetchDynamicPaths_default() {
    return Promise.resolve([]);
}

module.exports = {
    fetchDynamicPaths_WMSH,
    fetchDynamicPaths_default
};