<template>
  <div>
    <h5 class="menuh5">{{ social?.name }}</h5>
    <v-list v-for="item in social?.menus" :key="item">
      <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url"></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: social } = await useAsyncData('social', () => {
  return $directus.request($readItem('navigation', '4'))
})
  /* import { useNavigation } from '@/composables/cms/content/useNavigation';

// Pass the specific navigation name you want to fetch
const { navigation, fetchNavigation } = useNavigation();

onMounted(() => {
fetchNavigation('Account Social'); // Replace 'Main Menu' with the actual name of the navigation
});

 import socialmenu from '~/composables/graphql/cms/queries/menus/socialmenu'

const {
    data
} = useAsyncQuery(socialmenu);
  const {
    getItemById,
  } = useDirectusItems()

  const nav = await getItemById({
    collection: "navigation",
    id: 5
  });*/
</script>