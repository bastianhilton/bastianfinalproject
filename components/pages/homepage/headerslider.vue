<template>
    <div>
     <!-- <v-carousel hide-delimiters show-arrows="hover" :continuous="true" v-for="pages in homepage" :key="pages.id">
            <v-carousel-item :src="`${url}assets/${pages.image.filename_disk}`" :alt="pages.name" cover></v-carousel-item>
        </v-carousel>-->
    <div v-for="block in block?.items">
      <div v-html="block?.content"></div>
    </div>
    </div>
</template>

<script setup>
    import {
        getBlockById
    } from '@/composables/commerce/content/getBlocks';

    // Pass the specific block name you want to fetch
    const block = ref([]); 

    onMounted(async () => {
        block.value = await getBlockById(31);
    });
/*//import { cmsBlocks } from '~/graphql/commerce/queries/blocks/homepagesliderBlock';

const { data } = useAsyncQuery(cmsBlocks);
  const {
    $directus,
    $readItem,
    $readSingleton
  } = useNuxtApp()
  const route = useRoute()

  const {
    data: homepage
  } = await useAsyncData('homepage', () => {
    return $directus.request($readItem('pages', '28'))
  })

const query = gql`
query {
    pages (search: "homepage slider") {
      id
      status
      sort
      name
      content
      link
      image {
        filename_disk
      }
      list
      type
      date_created
    }
  }
`
const { data } = await useAsyncQuery(query)

const { getItems } = useDirectusItems()

const pages = await getItems({ collection: "pages", params: {filter: {name: {_eq: "Homepage Slider"}} }}); */
</script>