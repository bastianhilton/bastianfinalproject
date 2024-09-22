<template>
  <div class="contentPage">
    <!--<profilebar />-->
    <v-toolbar :title="result?.showcase?.name" :style="`background: ${result?.showcase?.color}`">
      <v-dialog min-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" prepend-icon="fas fa-plus" title="Update Showcase" variant="flat">Update
            Showcase
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <updateshowcase />
        </template>
      </v-dialog>

      <v-btn prepend-icon="fas fa-x" variant="text" title="Delete Showcase">Delete Showcase</v-btn>
    </v-toolbar>
    <section data-bs-version="5.1" class="header7 cid-twaHyROL0Y mbr-fullscreen" id="header7-43"
      :style="`background: ${result?.showcase?.color}`">
      <div class="animated-text-background display-7"
        style="color: rgb(239, 239, 239); opacity: 0.2; font-size: 10rem;">
        <span class="animated-element" data-word="Meet the new collection" data-speed="60">
        </span>
      </div>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 align-left img-block"
            :style="`background-color: ${result?.showcase?.color};`">
            <div class="mbr-figure">
              <img :src="`${result?.showcase?.image?.url}`"
                :alt="result?.showcase?.name">
            </div>
          </div>
          <div class="mbr-white col-md-6" :style="`color: ${result?.showcase?.colortext} !important`">
            <v-list lines="one" style="background-color: transparent !important;">
              <v-list-item :prepend-avatar="`${result?.showcase?.author?.node?.avatar?.url}`"
                :title="result?.showcase?.author?.node?.username"></v-list-item>
            </v-list>
            <h4 class="mbr-section-subtitle mbr-fonts-style align-left pb-2 display-5"
              :style="`color: ${result?.showcase?.colortext} !important`">
              {{ result?.showcase?.description?.html }}</h4>
            <h6 class="mbr-section-title mbr-white mbr-bold mbr-fonts-style align-left display-5"
              :style="`color: ${result?.showcase?.colortext} !important`">Created:
              {{ new Date(result?.showcase?.created_at).toLocaleDateString() }}</h6>
          </div>
        </div>
      </div>
    </section>

    <v-card>
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab :value="1">Products</v-tab>
        <v-tab :value="2">Reviews</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <v-container fluid>
            <div style="padding-top: 10px;" v-for="products in result?.showcase?.products?.items"
              :key="products.id">
              <productCard :product="products" />
            </div>
          </v-container>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-container fluid>
            <DisqusCount identifier="/blog/1" />

            <DisqusComments identifier="/blog/1" />
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import {
    useQuery
  } from '@vue/apollo-composable'
  import productCard from '~/components/commerce/product/productCard.vue'
  import profilebar from '~/components/menus/profilebar.vue'
  import updateshowcase from '~/components/cms/update/social/updateshowcase.vue'
  import showcase from '~/queries/commerce/queries/id/showcase'

  const tab = ref(null);
  const {
    result
  } = useQuery(showcase, null, {
    context: {
      clientName: 'secondary' // This will use the secondary endpoint
    }
  })

  useHead({
    title: result?.showcase?.name
  })
</script>