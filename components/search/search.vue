<template>
  <div>
    <!--
    <v-text-field id="mainSearch" density="compact" variant="solo" label="Search Meeovi" append-inner-icon="fas fa-search" single-line
        hide-details @input="fetchSearchResults"></v-text-field>-->
      <ais-instant-search
      id="mainSearch"
      :search-client="client"
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

<script setup>
import {
  AisInstantSearch,
  AisHits,
  AisSearchBox,
} from 'vue-instantsearch/vue3/es'

const route = useRoute()
const router = useRouter()
const client = useInstantSearch()

// Ref to store the search query
const query = ref('')

// Update the query when the route changes
watchEffect(() => {
  query.value = route.query.q || ''
})

// Function to update the query in the route when the user types in the search box
const updateQuery = (newQuery) => {
  query.value = newQuery
  router.push({ path: '/results', query: { q: newQuery } })
}
</script>