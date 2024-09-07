<template>
  <div>
    <h5 class="menuh5">{{ bottomsidebarmenu?.name }}</h5>
    <v-list v-for="item in bottomsidebarmenu?.menus" :key="item">
      <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url"></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: bottomsidebarmenu } = await useAsyncData('bottomsidebarmenu', () => {
  return $directus.request($readItem('navigation', '6'))
})
/*import { useNavigation } from '@/composables/cms/content/useNavigation';

// Pass the specific navigation name you want to fetch
const { navigation, fetchNavigation } = useNavigation();

onMounted(() => {
fetchNavigation('Try Something New'); // Replace 'Main Menu' with the actual name of the navigation
});

  import bottomsidebarmenu from '~/composables/graphql/cms/queries/menus/bottomsidebarmenu'

  const {
      data
  } = useAsyncQuery(bottomsidebarmenu);
  const {
    getItemById
  } = useDirectusItems()

  const nav = await getItemById({
    collection: "navigation",
    id: 6
  });*/
</script>