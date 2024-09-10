import { Client } from '@elastic/elasticsearch';
import 'dotenv' // Ensure you have a .env file for the environment variables

// Initialize the Elasticsearch client
const client = new Client({
    node: "http://89.116.38.24:9200",
    auth: {
      apiKey: "alY0UzE1RUJlVWZ6dWRUTnV5ZWo6SDUtaUxlZC1TdjZCSnVZWTU2OGhfUQ=="
    }
  });

async function test() {
  try {
    const response = await client.info();
    console.log('Elasticsearch response:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
