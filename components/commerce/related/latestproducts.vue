<template>
  <div>
    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
      <h4>Latest Products</h4>
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
        <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }" v-for="products in products?.items" :key="products.id">
          <productCard :product="products" :class="['ma-4', selectedClass]" @click="toggle" />

          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
            </v-scale-transition>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup>
  import {
        getLatestProducts
    } from '@/composables/commerce/products/getLatestProducts.js';

    // Pass the specific products name you want to fetch
    const products = ref([]); 

    onMounted(async () => {
        products.value = await getLatestProducts();
    });
/*  import productCard from '../commerce/product/productCard.vue'
  //import latestproducts from '~/graphql/commerce/queries/latestproducts'

  const model = ref(null);

  const {
    data
  } = useAsyncQuery(latestproducts); */
</script>