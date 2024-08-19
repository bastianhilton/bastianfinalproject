<template>
  <div>
    <v-menu :location="location" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="fas fa-user" title="My Account"></v-btn>
      </template>
      <v-list v-if="isLoggedIn">
        <v-row class="accountDropdown">
          <v-col cols="6">
            <h6>{{ nav?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in nav?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url">
              </v-list-item>
            </div>
          </v-col>

          <v-col cols="6">
            <h6>{{ navcomm?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in navcomm?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url">
              </v-list-item>
            </div>
          </v-col>

          <v-col cols="12">
            <logout />
          </v-col>
        </v-row>
      </v-list>
      
      <v-list v-else>
        <v-list-item><v-btn href="/auth/login">Login / Register</v-btn></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import logout from '~/components/authentication/logout'
  const auth = reactive(useAuth());;

  const location = ref('bottom')

  const {
    $directus,
    $readItem
  } = useNuxtApp()
  const route = useRoute()

  const {
    data: nav
  } = await useAsyncData('nav', () => {
    return $directus.request($readItem('navigation', '2'))
  })

  const {
    data: navcomm
  } = await useAsyncData('navcomm', () => {
    return $directus.request($readItem('navigation', '3'))
  })
</script>