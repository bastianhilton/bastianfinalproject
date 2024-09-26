<template>
    <div class="contentPage">
        <v-card elevation="0" style="min-height: 100vh !important;">
            <v-layout>
                <v-app-bar color="transparent" prominent elevation="0">
                    <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> Filters-->

                    <v-spacer></v-spacer>
                    <v-toolbar title="Deals" color="transparent"></v-toolbar>
                    <v-spacer></v-spacer>
                </v-app-bar>


                <!--<v-navigation-drawer class="filtersPanel" v-model="drawer"
                    :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
                    <filters />
                </v-navigation-drawer>-->

                <v-main>
                    <v-tabs class="searchSection" center-active v-model="tab" bg-color="transparent">
                        <v-tab value="one">All Deals</v-tab>
                        <v-tab value="two">Dollarland</v-tab>
                        <!--<v-tab value="three">Video Spaces</v-tab>-->
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="one">
                                <v-row>
                                    <v-col cols="3" v-for="products in result?.products?.items" :key="products">
                                        <productCard :product="products" />
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="two">
                                <v-row>
                                    <v-col cols="3" v-for="products in dollar?.products?.items" :key="products">
                                        <productCard :product="products" />
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <!--<v-tabs-window-item value="three">
                                <v-row>
                                    <v-col cols="3" v-for="products in products?.items" :key="products.id">
                                        <spaces :space="result" />
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>-->
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
    import {
    useQuery
    } from '@vue/apollo-composable'
    import productCard from '~/components/commerce/commerce/product/productCard.vue'
    import { deals } from '~/graphql/commerce/queries/deals'
    import dollarland from '~/graphql/commerce/queries/dollarland'

    const {
    result
    } = useQuery(deals)

    const {
    result: dollar
    } = useQuery(dollarland)

    const tab = ref(null)

    useHead({
        title: 'Deals',
    })
</script>