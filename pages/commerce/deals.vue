<template>
    <div>
        <div class="contentPage" v-for="cmspage in data?.pages?.nodes" :key="cmspage">
            <div v-html="cmspage.content"></div>
            <productCard />
        </div>
        <!---->
    </div>
</template>

<script>
import productCard from '../../../components/commerce/product/productCard.vue'

    export default {
        components: { productCard },
    }
</script>

<script setup>
  import deals from '~/graphql/commerce/queries/deals'

    useHead({
        title: 'Deals',
    })

const model = ref(null);

const {
  data
} = useAsyncQuery(deals);
</script>