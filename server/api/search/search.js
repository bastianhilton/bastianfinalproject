import client from '~/utils/elasticsearch';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)?.q || ''; // Get the 'q' query parameter from the request
    const pageSize = parseInt(getQuery(event)?.pageSize) || 10; // Get the page size from the request
    const lastSortValue = getQuery(event)?.lastSortValue || ''; // Get the last sort value from the request

    if (!query) {
        return { results: [], total: 0 }; // Return empty if no query is provided
    }

    try {
        const response = await client.search({
            index: useRuntimeConfig().indexName, // Elasticsearch index
            body: {
                query: {
                    match: {
                        field: query // Replace 'field' with the field you'd like to search
                    }
                },
                sort: [{ "_id": "asc" }], // Sort by document ID or another unique field
                size: pageSize,
                search_after: lastSortValue // Use the last sort value from the previous page
            }
        });

        return { 
            results: response.hits.hits, 
            total: response.hits.total.value,
            lastSortValue: response.hits.hits.length > 0 ? response.hits.hits[response.hits.hits.length - 1]._id : ''
        }; // Return the search results, total number of hits, and last sort value
    } catch (error) {
        console.error('Elasticsearch search error:', error.meta?.body?.error || error);
        throw createError({
            statusCode: 500,
            message: error.meta?.body?.error?.reason || 'Elasticsearch search failed'
        });
    }
});
