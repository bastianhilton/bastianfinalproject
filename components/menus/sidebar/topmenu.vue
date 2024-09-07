<template>
  <div>
    <h5 class="menuh5">{{ topmenu?.name }}</h5>
    <v-list v-for="item in topmenu?.menus" :key="item">
      <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url"></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: topmenu } = await useAsyncData('topmenu', () => {
  return $directus.request($readItem('navigation', '5'))
})
/*import { useNavigation } from '@/composables/cms/content/useNavigation';

// Pass the specific navigation name you want to fetch
const { navigation, fetchNavigation } = useNavigation();

onMounted(() => {
fetchNavigation('Trending'); // Replace 'Main Menu' with the actual name of the navigation
});

  import topmenu from '~/composables/graphql/cms/queries/menus/topmenu'

const {
    data
} = useAsyncQuery(topmenu);

  const {
    getItemById
  } = useDirectusItems()

  const nav = await getItemById({
    collection: "navigation",
    id: 5
  });*/
</script>