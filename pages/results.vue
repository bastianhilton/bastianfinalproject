<template>
    <div>
        <ais-instant-search
        id="searchResults"
        :search-client="client"
        index-name="products"
      >
        <ais-hits>
          <template v-slot="{ items }">
            <ul>
              <li
                v-for="{ id,title,poster } in items"
                :key="id"
              >
                <h1>{{ title }}</h1>
                <img :src="poster" :alt="`Poster from ${title}`">
              </li>
            </ul>
          </template>
        </ais-hits>
  
      </ais-instant-search>
    </div>
  </template>
  
  <script setup>
  import {
    AisInstantSearch,
    AisHits,
    AisSearchBox,
  } from 'vue-instantsearch/vue3/es'
  
  const client = useInstantSearch()
  </script>