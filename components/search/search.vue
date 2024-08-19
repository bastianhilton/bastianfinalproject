<template>
  <div>
    <!--<v-text-field id="mainSearch" density="compact" variant="solo" label="Search Meeovi" append-inner-icon="fas fa-search" single-line
        hide-details v-model="searchQuery" @keydown.enter="performSearch"></v-text-field>-->
      <ais-instant-search
      id="mainSearch"
      :search-client="searchClient"
      index-name="meeovi"
    >
      <ais-search-box
        placeholder="Search Meeovi"
        class="searchbox"
        :model-value="query" 
      ></ais-search-box>
    </ais-instant-search>
  </div>
</template>

<script setup>
import Client from '@searchkit/instantsearch-client'
import Searchkit from "searchkit"
import 'dotenv'

const config = {
  connection: {
    host: "http://89.116.38.24:9200",
    // if you are authenticating with api key
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-api-key
    apiKey: "u56Zu6EyRrWX24P_L1b5vw",
    // if you are authenticating with username/password
    // https://www.searchkit.co/docs/guides/setup-elasticsearch#connecting-with-usernamepassword
    auth: {
      username: "elastic",
      password: "Elshack@1086"
    },
  },
  search_settings: {
    highlight_attributes: ['*'],
    search_attributes: ['*'],
    result_attributes: ['*'],
    facet_attributes: [
      'type',
      { attribute: '*', field: '*.keyword', type: 'string' }
    ],
    sorting: {
      default: {
        field: '_score',
        order: 'desc'
      },
      _rated_desc: {
        field: 'rated',
        order: 'desc'
      }
    },
    snippet_attributes: ['plot'],
    query_rules: []
  }
}

const searchkitClient = new Searchkit(config)
const searchClient = Client(searchkitClient);
</script>