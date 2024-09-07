// /composables/commerce/products/useLatestProducts.js
import { useRuntimeConfig } from '#imports';

export const getLatestProducts = (pageSize = 10) => {
  const config = useRuntimeConfig();

  return useFetch(`${config.public.commerceUrl}/rest/default/V1/products`, {
    headers: {
      'Authorization': `Bearer ${config.public.commerceApiToken}`,
    },
    params: {
      'searchCriteria[sortOrders][0][field]': 'created_at',
      'searchCriteria[sortOrders][0][direction]': 'DESC',
      'searchCriteria[pageSize]': pageSize, // Limit the number of products
    },
  });
};
