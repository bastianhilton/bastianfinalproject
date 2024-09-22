<template>
  <v-card variant="text">
    <v-tabs style="background-color: transparent" center-active>
      <div v-for="(menu, index) in result?.menus?.nodes" :key="index">
      <v-tab>
        <a href="/account/user/profile">Profile</a>
      </v-tab>
      <v-tab v-for="(item, index) in menu?.menuItems?.nodes" :key="index">
        <a :href="item?.path">{{ item?.label }}</a>
      </v-tab>
      </div>
    </v-tabs>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import profilebar from '~/graphql/cms/queries/menus/profilebar'

const { result } = useQuery(profilebar, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})

 /* import profilebar from '~/graphql/cms/queries/menus/profilebar'

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