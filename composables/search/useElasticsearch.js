import { Client } from '@elastic/elasticsearch';

export const useElasticsearch = () => {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD,
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true,
    roles: {
        master: true,
        data: true,
        ingest: true,
        ml: false
    },
  });

  const search = async (index, query) => {
    try {
      const response = await client.search({
        index,
        body: {
          query,
        },
      });
      return response.body.hits.hits;
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      return [];
    }
  };

  return {
    search,
  };
};
