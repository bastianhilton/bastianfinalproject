<template>
  <div>
    <v-row class="productCard">
      <v-col>
        <v-card class="mx-auto" max-width="400" min-height="550" :href="`/product/${product?.sku}`" >
          <img class="align-end text-white" style="max-height: 300px; min-height: 300px;" :src="`${product?.image?.url}`" :alt="product?.name" cover>
          <v-card-title>{{product?.name}}</v-card-title>

          <v-card-text>
            <v-rating v-model="rating" active-color="orange" color="orange-lighten-1"></v-rating>

            <div>Sku: {{ product?.sku }}</div>

            <div>Category: {{ product?.categories?.name }}</div>

            <div>{{ product?.price_range?.minimum_price?.regular_price?.currency }}
              {{ product?.price_range?.minimum_price?.regular_price?.value }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text="Add to Cart"></v-btn>

            <v-btn prepend-icon="fas fa-bookmark" color="info" title="Bookmark This Product"></v-btn>

            <v-btn prepend-icon="fas fa-heart" color="info" title="Add to List"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      //url: process.env.DIRECTUS_URL,
      rating: null,
    }),
  }
</script>
<script setup>
  import {
    SfRating,
    SfCounter,
    SfLink,
    SfButton,
    SfIconShoppingCart,
    SfIconFavorite
  } from '@storefront-ui/vue';

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });
  const {
    product
  } = props;

  /*  const {
      getItems
    } = useDirectusItems()
    const route = useRoute();

    const products = await getItems({
      collection: "products",
    }); */
</script>