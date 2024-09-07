<template>
  <div>
    <v-menu :location="location" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="fas fa-user" title="My Account"></v-btn>
      </template>
      <RequireAuth>
        <v-list>
          <v-row class="accountDropdown">
            <v-toolbar v-if="Boolean(user)" :title="`Hello, ${user?.username}`" color="orange">
            </v-toolbar>
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
              <logout /><!---->
            </v-col>
          </v-row>
        </v-list>
      </RequireAuth>

      <RequireAnonymous>
        <v-list>
          <v-list-item>
            <v-btn variant="text" href="/auth/login">Login</v-btn> |
            <v-btn variant="text" href="/auth/register">Register</v-btn>
          <!--<LoginLink to="/api/login" external>
            Sign in
          </LoginLink>

          <a :href="`/sign-${ user ? 'out' : 'in' }`"> Sign {{ user ? 'out' : 'in' }} </a>-->
          </v-list-item>
        </v-list>
      </RequireAnonymous>
    </v-menu>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import logout from '~/components/authentication/logout.vue'
  import { useLogtoUser } from '#imports'; // Add this line if auto-import is disabled
  //import { useFusionAuth } from "@fusionauth/vue-sdk";

  /*const {
    isLoggedIn,
    userInfo,
    isFetchingUserInfo,
    login,
    register,
  } = useFusionAuth();*/

  const user = useLogtoUser();

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