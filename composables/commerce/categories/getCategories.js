import { useRuntimeConfig } from '#imports';

export const getCategories = async () => {
  const config = useRuntimeConfig();
  try {
    const categories = await $fetch(`${config.public.commerceUrl}/rest/default/V1/categories`, {
      headers: {
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      }
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Check your API token.');
    }
    return [];
  }
};

export const getCategoryById = async (uid) => {
  const config = useRuntimeConfig();
  try {
    const category = await $fetch(`${config.public.commerceUrl}/rest/V1/categories/${uid}`, {
      headers: {
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      }
    });
    return category;
  } catch (error) {
    console.error(`Error fetching category with ID ${uid}:`, error);
    return null;
  }
};

export const getCategoryProducts = async (uid) => {
  const config = useRuntimeConfig();
  try {
    const response = await $fetch(`${config.public.commerceUrl}/rest/V1/categories/products`, {
      headers: {
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      },
      params: {
        searchCriteria: JSON.stringify({
          filterGroups: [{
            filters: [{
              field: 'category_id',
              value: uid,
              conditionType: 'eq'
            }]
          }]
        })
      }
    });
    return response.items;
  } catch (error) {
    console.error(`Error fetching products for category with ID ${uid}:`, error);
    return [];
  }
};

export const getCategoriesByIds = async (ids) => {
  const config = useRuntimeConfig();
  const promises = ids.map(id => 
    $fetch(`${config.public.commerceUrl}/rest/V1/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      }
    }).catch(error => {
      console.error(`Error fetching category with ID ${id}:`, error);
      return null;
    })
  );

  try {
    const categories = await Promise.all(promises);
    return categories.filter(category => category !== null);
  } catch (error) {
    console.error('Error fetching multiple categories:', error);
    return [];
  }
};

// Function to fetch latest products (example, assuming this endpoint exists)
export const getLatestProducts = async () => {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.commerceUrl}/rest/V1/products?searchCriteria[sortOrders][0][field]=created_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=5`, {
      headers: {
        Authorization: `Bearer ${config.public.commerceApiToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
};

// Function to fetch best-selling products (example, assuming this endpoint exists)
export const getBestSellingProducts = async () => {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.commerceUrl}/rest/V1/products?searchCriteria[sortOrders][0][field]=sales&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=5`, {
      headers: {
        Authorization: `Bearer ${config.public.commerceApiToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    return [];
  }
};


