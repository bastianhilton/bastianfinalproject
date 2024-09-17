import {
  defineApolloClient
} from '@nuxtjs/apollo/config'

console.log('wpgraphql client is being used');

export default defineApolloClient({
  httpEndpoint: process.env.API_URL_GRAPHQL,
  httpLinkOptions: {
    headers: {
      'Authorization': `Bearer ${process.env.WORDPRESS_TOKEN}`,
      'username': process.env.WP_API_USERNAME,
      'password': process.env.WP_API_PASSWORD,
      'content-type': 'application/json'
    }
  },
  websocketsOnly: false,
  connectToDevTools: false,
  defaultOptions: {},
  inMemoryCacheOptions: {},
  tokenStorage: 'cookie',
  authType: 'Bearer',
  authHeader: 'Authorization'
})