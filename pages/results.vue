<template>
  <div class="resultsPage">
    <v-card elevation="0" style="min-height: 100vh !important;">
      <v-layout>
        <v-app-bar color="transparent" prominent>
         <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> Filters-->

          <v-spacer></v-spacer>
          <v-toolbar-title style="text-align: center;">Search Results for "{{ searchQuery }}"</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        
        <v-navigation-drawer class="filtersPanel" v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
          <filters />
        </v-navigation-drawer>

        <v-main>
          <v-tabs class="searchSection" center-active v-model="tab" bg-color="transparent">
            <v-tab value="one">Results</v-tab>
            <!--<v-tab value="two">Spaces</v-tab>
            <v-tab value="three">Creators</v-tab>-->
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <div v-if="results.length">
                  <v-row>
                    <v-col cols="3" v-for="(result, index) in results" :key="index">
                      <productCard :product="result" />
                    </v-col>
                  </v-row>
                </div>

                <p v-else>No results found.</p>

                
                <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" @input="fetchSearchResults">
                </v-pagination>
              </v-tabs-window-item>
              
              <v-tabs-window-item value="two">
                <wpresults />
              </v-tabs-window-item>

              <v-tabs-window-item value="three">
                <relatedcreators />
                <v-pagination :length="3"></v-pagination>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    watch
  } from 'vue';
  import {
    useRouter,
    useRoute
  } from 'vue-router';
  import filters from '~/components/search/filters.vue';
  import wpresults from '~/components/search/advanced/wpresults.vue';
  import relatedcreators from '~/components/cms/related/relatedcreators.vue';
  import productCard from '~/components/commerce/commerce/product/productCard.vue';

  const tab = ref(null);
  const group = ref(null);
  const drawer = ref(false);
  const results = ref([]);
  const searchQuery = ref('');
  const currentPage = ref(1); // Track the current page
  const totalPages = ref(1); // Track the total number of pages
  const pageSize = ref(10); // Number of results per page
  const route = useRoute();
  const config = useRuntimeConfig();

  const fetchSearchResults = async () => {
    if (route.query.q) {
      searchQuery.value = route.query.q;
      try {
        // Fetch search results with pagination
        const response = await $fetch(`/api/search/search?q=${searchQuery.value}`);
        results.value = response.results;
        totalPages.value = response.totalPages;
      } catch (err) {
        console.error('Search error:', err);
      }
    }
  };

  // Fetch results on component mount and when the query changes
  onMounted(fetchSearchResults);
  watch(() => route.query.q, fetchSearchResults);

  definePageMeta({
    layout: 'nolive',
  });

  useHead({
    title: 'Search Results',
  });
</script>