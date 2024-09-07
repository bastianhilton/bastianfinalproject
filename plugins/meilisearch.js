import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const host = config.public.MEILISEARCH_HOST
  const apiKey = config.public.MEILISEARCH_API_KEY

  const searchClient = instantMeiliSearch(host, apiKey)

  nuxtApp.vueApp.provide('searchClient', searchClient)
})
