import { Client, Transport } from '@elastic/elasticsearch';
import { useRuntimeConfig } from '#imports'; // Use Nuxt's runtime config

const logger = {
    info: console.log,
    error: console.error,
};

class MyTransport extends Transport {
    request(params, options, callback) {
        logger.info('Request:', params);
        return super.request(params, options, callback).then(response => {
            logger.info('Response:', response);
            return response;
        }).catch(error => {
            logger.error('Request Error:', error);
            throw error;
        });
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const client = new Client({
        node: config.searchHost,
        auth: {
            apiKey: config.searchKey
        },
        maxRetries: 5,
        requestTimeout: 120000,
        sniffOnStart: false,
        Transport: MyTransport
    });

    client.info()
        .then(response => {
            logger.info('Elasticsearch Info:', response);
        })
        .catch(error => {
            logger.error('Elasticsearch Info Error:', error);
        });

    return {
        provide: {
            elasticsearchClient: client
        }
    };
});
