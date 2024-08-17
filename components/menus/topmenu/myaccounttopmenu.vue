<template>
  <div>
    <v-menu :location="location" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="fas fa-user" title="My Account"></v-btn>
      </template>
      <v-list>
        <v-row class="accountDropdown">
          <v-col cols="6">
            <h6>{{ nav?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in nav?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon"
                :href="item?.url"></v-list-item>
            </div>
          </v-col>

          <v-col cols="6">
            <h6>{{ navcomm?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in navcomm?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon"
                :href="item?.url"></v-list-item>
            </div>
          </v-col>

          <v-col cols="12">
            <logout />
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import logout from '~/components/authentication/logout'
  
const location = ref('bottom')

const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: nav } = await useAsyncData('nav', () => {
  return $directus.request($readItem('navigation', '2'))
})

const { data: navcomm } = await useAsyncData('navcomm', () => {
  return $directus.request($readItem('navigation', '3'))
})
  //import { AccountCommerce, AccountSocial } from '~/graphql/cms/queries/menus/myaccounttopmenu'

 /*  import {
    useNavigation
  } from '@/composables/cms/content/useNavigation';

  // Define the menu names you want to fetch
  const menuNames = ['Account Commerce', 'Account Social'];
  const {
    navigation,
    fetchNavigation
  } = useNavigation();

  onMounted(() => {
    fetchNavigation(menuNames);
  });

  const {
    logout
  } = useAuth()
  const location = ref('bottom');
  const dialog = ref(false);
  const notifications = ref(false);
  const sound = ref(true);
  const widgets = ref(false)

  //import { useAuth } from '~/composables/auth/useCustomerLogout'

 const {
      data
  } = useAsyncQuery(AccountCommerce);

    const {
      data: social
    } = useAsyncQuery(AccountSocial);

      const {
        getItemById
      } = useDirectusItems()

      const nav = await getItemById({
        collection: "navigation",
        id: 2
      });

      const navcomm = await getItemById({
        collection: "navigation",
        id: 3
      });*/
</script>