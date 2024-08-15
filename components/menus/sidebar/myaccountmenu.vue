<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel :title="nav?.name" expand-icon="fas fa-plus" collapse-icon="fas fa-minus" elevation="0">
        <v-expansion-panel-text>
          <v-list v-for="item in nav?.menus" :key="item">
            <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url">
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: nav } = await useAsyncData('nav', () => {
  return $directus.request($readItem('navigation', '2'))
})

/*import { useNavigation } from '@/composables/cms/content/useNavigation';

// Pass the specific navigation name you want to fetch
const { navigation, fetchNavigation } = useNavigation();

onMounted(() => {
fetchNavigation('Account Commerce'); // Replace 'Main Menu' with the actual name of the navigation
});

  import myaccountmenu from '~/graphql/cms/queries/menus/myaccountmenu'

const {
    data
} = useAsyncQuery(myaccountmenu);

    const {
      getItemById
    } = useDirectusItems()

    const nav = await getItemById({
      collection: "navigation",
      id: 2
    }); */
</script>