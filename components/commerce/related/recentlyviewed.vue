<template>
  <div>
    <!--<v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
      <h4>Recently Viewed</h4>
      <div v-if="pending">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <v-slide-group v-if="!pending && products" v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
        <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }" v-for="(products, index) in products?.items" :key="index">
          <productCard :product="products" :class="['ma-4', selectedClass]" @click="toggle" />

          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
            </v-scale-transition>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>-->

    <div v-for="block in data?.cmsBlocks?.items">
      <h4>{{ block?.title }}</h4>

      <div v-html="block?.content"></div>
    </div>
  </div>
</template>

<script setup>
  import productCard from '../commerce/product/productCard.vue'
  import { cmsBlocks } from '~/composables/graphql/commerce/queries/blocks/recentlyviewedBlock.js';

  const { data } = useAsyncQuery(cmsBlocks);
  //import recentlyreviewed from '~/composables/graphql/commerce/queries/recentlyviewed'

  const model = ref(null);

  //const {  data } = useAsyncQuery(recentlyreviewed);
</script>