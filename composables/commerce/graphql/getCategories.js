// composables/useMagentoGraphQL.js
import { useFetch, useAsyncData } from '#app'

export function useMagentoGraphQL() {
  const config = useRuntimeConfig()
  const magentoGraphQLEndpoint = config.public.websiteURL

  const fetchGraphQL = async (query, variables = {}) => {
    return useFetch(magentoGraphQLEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': `${config.public.websiteToken}`,
      },
      body: JSON.stringify({ query, variables }),
    })
  }

  const getCategories = () => {
    const query = `
      query GetCategories {
        categories(filters: {}) {
          items {
            id
            name
            url_key
            children {
              id
              name
              url_key
            }
          }
        }
      }
    `
    return useAsyncData(
      'categories',
      () => fetchGraphQL(query).then(res => res.data.value.categories.items),
      {
        server: true,
        lazy: false,
        default: () => [],
        transform: (data) => data || [],
        watch: false,
        // Cache for 5 minutes
        maxAge: 300
      }
    )
  }

  const getCategoryById = (id) => {
    const query = `
      query GetCategoryById($id: Int!) {
        category(id: $id) {
          id
          name
          url_key
          description
          image
          children {
            id
            name
            url_key
          }
          products {
            items {
              id
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
            }
          }
        }
      }
    `
    return useAsyncData(
      `category-${id}`,
      () => fetchGraphQL(query, { id: parseInt(id) }).then(res => res.data.value.category),
      {
        server: true,
        lazy: false,
        default: () => null,
        transform: (data) => data || null,
        watch: false,
        // Cache for 5 minutes
        maxAge: 300
      }
    )
  }

  return {
    getCategories,
    getCategoryById,
  }
}
