<script lang="ts" setup>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisInstantSearch } from 'vue-instantsearch/vue3/es'
import { useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();

const props = defineProps<{
  indexName: string
}>()

const { indexName } = toRefs(props)

//const { host, searchApiKey, options } = useRuntimeConfig().meilisearch 

const { host } = process.env.MEILISEARCH_HOST || "http://89.116.38.24:7700"
const { searchApiKey } = process.env.MEILISEARCH_SEARCH_API_KEY
const { options } = config.public.meilisearch.options

const searchClient = instantMeiliSearch(host, searchApiKey, options)
</script>

<template>
  <AisInstantSearch :index-name="indexName" :search-client="searchClient">
    <slot name="default" />
  </AisInstantSearch>
</template>