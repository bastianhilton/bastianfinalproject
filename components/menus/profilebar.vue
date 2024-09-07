<template>
  <v-card variant="text">
    <v-tabs style="background-color: transparent" center-active>
      <div v-for="(menu, index) in navigation" :key="index">
      <v-tab>
        <a href="/account/user/profile">Profile</a>
      </v-tab>
      <v-tab v-for="items in menu?.navigationFields?.menu?.nodes" :key="items.id">
        <a :href="items?.websiteFields?.link">{{ items?.title }}</a>
      </v-tab>
      </div>
    </v-tabs>
  </v-card>
</template>

<script setup>
import { useNavigation } from '@/composables/cms/content/useNavigation';

const dialog = ref(false);
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false)
// Pass the specific navigation name you want to fetch
const { navigation, fetchNavigation } = useNavigation();

onMounted(() => {
fetchNavigation('Profile Menu'); // Replace 'Main Menu' with the actual name of the navigation
});

 /* import profilebar from '~/composables/graphql/cms/queries/menus/profilebar'

const {
    data
} = useAsyncQuery(profilebar);*/

  /* const {
     getItemById
   } = useDirectusItems()

   const nav = await getItemById({
     collection: "navigation",
     id: 1
   });*/
</script>