// composables/useDeals.js
import { ref } from 'vue';
import { GET_DEALS } from '~/graphql/commerce/queries/deals';

export function useDeals(clientName = 'commerce') {
    const { apolloClients } = useNuxtApp();
  
    // Log to check if apolloClients is defined
    console.log('Apollo Clients in useDeals:', apolloClients);
  
    const loading = ref(true);
    const error = ref(null);
    const data = ref(null);
  
    const fetchDeals = async () => {
      loading.value = true;
      console.log(`Fetching deals using ${clientName}...`);
      try {
        const client = apolloClients[clientName];
        if (!client) {
          throw new Error(`Apollo client with name "${clientName}" not found.`);
        }
        const result = await client.query({
          query: GET_DEALS,
        });
        console.log('GraphQL result:', result);
        data.value = result.data.products.items;
      } catch (err) {
        console.error('Error fetching deals:', err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    };
  
    fetchDeals();
  
    return {
      loading,
      error,
      data,
      refetch: fetchDeals,
    };
  }
  
  