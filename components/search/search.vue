<template>
  <div>
    <!--<v-text-field id="mainSearch" density="compact" variant="solo" label="Search Meeovi" append-inner-icon="fas fa-search" single-line
        hide-details @input="onSearch" @click:append-inner="onClick"></v-text-field>-->
      <ais-instant-search
      id="mainSearch"
      :search-client="searchClient"
      index-name="products"
    >
      <ais-search-box
        placeholder="Search Meeovi"
        class="searchbox"
        :model-value="query" 
        @update:model-value="updateQuery"
      ></ais-search-box>
    </ais-instant-search>
  </div>
</template>

<script>
  export default {
    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>

<script setup>
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import "instantsearch.css/themes/satellite-min.css";
import Searchkit from "searchkit"
import config from '~/composables/search/useElasticsearch'
//import searchClient from '~/composables/search/useMeilisearch'

const route = useRoute()
const router = useRouter()
//const client = useInstantSearch()

const onSearch = (query) => {
  router.push({ path: '/results', query: { q: query } })
}

const searchkitClient = new Searchkit(config)
const searchClient = Client(searchkitClient);
</script>