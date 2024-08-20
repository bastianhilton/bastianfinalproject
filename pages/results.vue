<template>
  <div class="resultsPage">
    <!--<v-card elevation="0" min-height="100vh">
      <v-layout>
        <v-app-bar color="transparent" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> Filters

          <v-spacer></v-spacer>
          <v-toolbar-title style="text-align: center;">Search Results</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer class="filtersPanel" v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
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
                <div v-for="product in products" :key="product.id">
                  <productCard :products="product" />
                </div>
                <v-pagination :length="3"></v-pagination>
              </v-tabs-window-item>

              <v-tabs-window-item value="two">
                <relatedspaces />
                <v-pagination :length="3"></v-pagination>
              </v-tabs-window-item>

              <v-tabs-window-item value="three">
                <relatedcreators />
                <v-pagination :length="3"></v-pagination>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-main>
      </v-layout>
    </v-card>-->
    <ais-instant-search :search-client="searchClient" index-name="YOUR_ALGOLIA_INDEX_NAME">
      <ais-search-box>
        <div slot-scope="{ isSearchStalled, refine }">
          <input
            type="text"
            placeholder="Search..."
            :value="searchQuery"
            @input="refine($event.currentTarget.value)"
          />
        </div>
      </ais-search-box>
      <ais-hits>
        <div slot-scope="{ items }">
          <ul>
            <li v-for="item in items" :key="item.objectID">
              {{ item.hit.name }} <!-- Replace with your desired field -->
            </li>
          </ul>
        </div>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script setup>
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch'
import { useAlgoliaRef } from '@nuxtjs/algolia/dist/module'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

const route = useRoute()
const searchClient = useAlgoliaRef()

const searchQuery = computed({
  get: () => route.query.q || '',
  set: (newValue) => {
    if (newValue) {
      route.push({ path: '/search', query: { q: newValue } })
    } else {
      route.push({ path: '/' })
    }
  }
})

watch(
  () => route.query.q,
  (newValue) => {
    searchQuery.value = newValue || ''
  }
)

 /* import filters from '~/components/search/filters.vue'
  import relatedspaces from '~/components/cms/related/relatedspaces.vue'
  import relatedcreators from '~/components/cms/related/relatedcreators.vue'
  import productCard from '~/components/commerce/commerce/product/productCard.vue'

  const tab = ref(null)
  const group = ref(null)
  const drawer = ref(false)

  // Define the props using defineProps
  const props = defineProps({
    products: Array,
    total: Number,
    page: Number,
    pageSize: Number,
  });

  // Destructure the props
  const {
    products,
    total,
    page,
    pageSize
  } = toRefs(props);

  // Emit events using defineEmits
  const emit = defineEmits(['page-change']);

  // Compute the total number of pages
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  // Method to go to the next page
  const nextPage = () => {
    if (page.value < totalPages.value) {
      emit('page-change', page.value + 1);
    }
  };

  // Method to go to the previous page
  const previousPage = () => {
    if (page.value > 1) {
      emit('page-change', page.value - 1);
    }
  };*/

  definePageMeta({
    layout: 'nolive',
  });

  useHead({
    title: 'Search Results'
  })
</script>