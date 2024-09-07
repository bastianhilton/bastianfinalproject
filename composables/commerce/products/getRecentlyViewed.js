// /composables/commerce/products/getRecentlyViewed.js
import { useRuntimeConfig } from '#imports';

export const getRecentlyViewed = (cmsPage) => {
  const config = useRuntimeConfig();

  return useFetch(`${config.public.commerceUrl}/rest/default/V1/cmsPage/search`, {
    headers: {
      'Authorization': `Bearer ${config.public.commerceApiToken}`,
    },
    params: {
      'searchCriteria[filterGroups][0][filters][0][field]': 'identifier',
      'searchCriteria[filterGroups][0][filters][0][value]': cmsPage,
      'searchCriteria[filterGroups][0][filters][0][condition_type]': 'eq',
    },
  });
};
