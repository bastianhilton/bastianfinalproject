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

</script>