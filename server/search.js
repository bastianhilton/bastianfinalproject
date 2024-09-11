import client from '~/utils/search/elasticsearch.js';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)?.q || ''; // Get the 'q' query parameter from the request
    const page = getQuery(event)?.page ? parseInt(getQuery(event).page) : 1; // Ensure that page is properly fetched and parsed
    const pageSize = getQuery(event)?.pageSize ? parseInt(getQuery(event).pageSize) : 10; // Ensure pageSize is fetched and parsed

    if (!query) {
        return { results: [], total: 0 }; // Return empty if no query is provided
    }

    try {
        const from = (page - 1) * pageSize; // Calculate the starting point for pagination
        const response = await client.search({
            index: useRuntimeConfig().indexName, // Elasticsearch index
            body: {
                query: {
                    match: {
                        field: query // Replace 'field' with the field you'd like to search
                    }
                },
                from: from, // Pagination: where to start fetching results
                size: pageSize // Pagination: number of results per page
            }
        });

        return { 
            results: response.hits.hits, 
            total: response.hits.total.value,
            currentPage: page,
            totalPages: Math.ceil(response.hits.total.value / pageSize)
        }; // Return the search results, total number of hits, and pagination info
    } catch (error) {
        console.error('Elasticsearch search error:', error.meta?.body?.error || error);
        throw createError({
            statusCode: 500,
            message: error.meta?.body?.error?.reason || 'Elasticsearch search failed'
        });
    }
});
