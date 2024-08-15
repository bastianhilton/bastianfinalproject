// plugins/apollo.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { defineNuxtPlugin } from '#app';
import { provideApolloClient } from '@vue/apollo-composable';

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink1 = new HttpLink({ uri: 'https://api1.example.com/graphql' });
  const httpLink2 = new HttpLink({ uri: 'https://api2.example.com/graphql' });

  const client1 = new ApolloClient({
    link: httpLink1,
    cache: new InMemoryCache(),
  });

  const client2 = new ApolloClient({
    link: httpLink2,
    cache: new InMemoryCache(),
  });

  // Provide the default Apollo client
  provideApolloClient(client1);

  // Make clients available through Nuxt's provide/inject API
  nuxtApp.provide('apollo', {
    default: client1,
    client2: client2,
  });
});
