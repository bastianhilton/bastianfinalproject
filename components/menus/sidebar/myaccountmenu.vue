<template>
  <div>
    <div>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel :title="nav?.name" expand-icon="fas fa-plus" collapse-icon="fas fa-minus" elevation="0">
          <v-expansion-panel-text>
            <v-list>
              <v-row class="accountDropdown">
                <v-toolbar v-if="user" :title="`Hello, ${user.username}`" color="orange">
                </v-toolbar>
                <v-col cols="12">
                  <h6>{{ nav?.name }}</h6>
                  <br>
                  <v-divider></v-divider>
                  <div v-for="(item, index) in nav?.menus" :key="index">
                    <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url">
                    </v-list-item>
                  </div>
                </v-col>

                <v-col cols="12">
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

            <v-list>
              <v-list-item>
                <!--<v-btn @click="login()" variant="text">Login</v-btn> |
                <v-btn @click="register()" variant="text">Register</v-btn>
                <v-btn @click="login()" href="/auth/login">Login / Register</v-btn>
          <LoginLink to="/api/login" external>
            Sign in
          </LoginLink>-->

                <a :href="`/sign-${ user ? 'out' : 'in' }`"> Sign {{ user ? 'out' : 'in' }} </a>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import logout from '~/components/authentication/logout.vue'
  import {
    useLogtoUser
  } from '#imports'; // Add this line if auto-import is disabled
  //import { useFusionAuth } from "@fusionauth/vue-sdk";

 /* const {
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