<template>
    <div class="contentPage">
        <v-toolbar :style="`background-color: ${data?.chart?.color}`" :title="data?.chart?.name"></v-toolbar>
        <v-table class="charttable">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-left">
                        This Week
                    </th>
                    <th class="text-left">Name</th>
                    <th class="text-left">
                        Award
                    </th>
                    <th class="text-left">
                        Last Week
                    </th>
                    <th class="text-left">
                        Peak Position
                    </th>
                    <th class="text-left">
                        Weeks on Chart
                    </th>
                    <th class="text-left">
                        Buy
                    </th>
                    <th class="text-left">Share</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(products, index) in data?.chart?.products?.items" :key="index">
                    <td class="chartnumber">
                        <h1>{{ data?.chart?.thisWeek }}</h1>
                    </td>
                    <td>
                        <v-avatar :image="products?.image?.sourceUrl" rounded="0" size="130"></v-avatar>
                    </td>
                    <td>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>{{ products?.name }}</v-list-item-title>
                                <div v-for="product in products?.productTypes?.items" :key="product">
                                  <v-list-item-subtitle>{{ product?.name }}</v-list-item-subtitle>  
                                </div>
                            </v-list-item>
                        </v-list>
                    </td>
                    <td>
                        <v-avatar icon="fas fa-star" :style="`color: ${data?.chart?.award}`"></v-avatar>
                    </td>
                    <td>
                        <h5>{{ data?.chart?.lastWeek }}</h5>
                    </td>
                    <td>
                        <h5>{{ data?.chart?.peakPosition }}</h5>
                    </td>
                    <td>
                        <h5>{{ data?.chart?.weeksOnChart }}</h5>
                    </td>
                    <td>
                        <v-btn href="" icon="fas fa-shopping-cart"></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <relatedchart />
        <relatedproducts /><!---->
        <recentlyviewed /><!---->
    </div>
</template>

<script setup>
    import relatedchart from '../../../components/related/relatedcharts.vue'
    import relatedproducts from '../../../components/related/relatedproducts.vue'
    import recentlyviewed from '../../../components/related/recentlyviewed.vue'


  const {
    data
  } = useAsyncQuery(query, {
    id: route.params.id
  });

/*const {
    getItemById
  } = useDirectusItems()
  const route = useRoute();

  const chart = await getItemById({
    collection: "musicchart",
    id: route.params.id,
  }); */

  useHead({
    title: data?.chart?.name,
  })
</script>