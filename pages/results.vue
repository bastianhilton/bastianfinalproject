<template>
  <div class="resultsPage">
    <v-card elevation="0" min-height="100vh">
      <v-layout>
        <v-app-bar color="transparent" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> Filters

          <v-spacer></v-spacer>
          <v-toolbar-title style="text-align: center;">Search Results</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer class="filtersPanel" v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
          <filters />
        </v-navigation-drawer>

        <v-main>
            <v-tabs class="searchSection" center-active v-model="tab" bg-color="transparent">
              <v-tab value="one">Results</v-tab>
              <v-tab value="two">Spaces</v-tab>
              <v-tab value="three">Creators</v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                  <productCard />
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                  <relatedspaces />
                </v-tabs-window-item>

                <v-tabs-window-item value="three">
                  <relatedcreators />
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
    ref
  } from 'vue'
  import filters from '~/components/search/filters.vue'
  import relatedspaces from '~/components/cms/related/relatedspaces.vue'
  import relatedcreators from '~/components/cms/related/relatedcreators.vue'
  import productCard from '~/components/commerce/commerce/product/productCard.vue'

  const tab = ref(null)
  const group = ref(null)
  const drawer = ref(false)

  definePageMeta({
    layout: 'nolive',
  });

  useHead ({
    title: 'Search Results'
  })
</script>