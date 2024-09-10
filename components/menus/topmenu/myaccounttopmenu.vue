<template>
  <div>
    <v-menu :location="location" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="fas fa-user" title="My Account"></v-btn>
      </template>

      <!-- Show loading state while checking user data -->
      <v-list v-if="loading">
        <v-list-item>Loading...</v-list-item>
      </v-list>

      <!-- Show when user is logged in -->
      <v-list v-if="isAuthenticated">
        <v-row class="accountDropdown">
          <v-toolbar :title="`Hello, ${user?.firstname || 'User'}`" color="orange"></v-toolbar>

          <!-- First column of the user menu -->
          <v-col cols="6">
            <h6>{{ nav?.name }}</h6>
            <v-divider></v-divider>
            <div v-for="(item, index) in nav?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url"></v-list-item>
            </div>
          </v-col>

          <!-- Second column of the user menu -->
          <v-col cols="6">
            <h6>{{ navcomm?.name }}</h6>
            <v-divider></v-divider>
            <div v-for="(item, index) in navcomm?.menus" :key="index">
              <v-list-item :title="item?.name" :value="item?.name" :prepend-icon="item?.icon" :href="item?.url"></v-list-item>
            </div>
          </v-col>

          <!-- Logout option -->
          <v-col cols="12">
            <logout />
          </v-col>
        </v-row>
      </v-list>

      <!-- Show when user is NOT logged in -->
      <v-list v-else>
        <v-list-item>
          <v-btn variant="text" href="/auth/login">Login</v-btn> |
          <v-btn variant="text" href="/auth/register">Register</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logout from '~/components/authentication/logout.vue'
import { useNuxtApp } from '#app'

const isAuthenticated = ref(false);

// Fetch user status
onMounted(async () => {
  const { $cookies } = useNuxtApp();  // Access $cookies from useNuxtApp()
  const token = $cookies.get('auth_token');  // Get the auth token from cookies

  if (token) {
    // Check token validity with Magento API
    try {
      const userData = await $fetch('/rest/V1/customers/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (userData) {
        isAuthenticated.value = true;
      }
    } catch (error) {
      // Token is invalid or expired
      isAuthenticated.value = false;
    }
  }
});

// Fetch navigation data from Directus or other sources
const { $directus, $readItem } = useNuxtApp()

const { data: nav } = await useAsyncData('nav', () => {
  return $directus.request($readItem('navigation', '2'))
})

const { data: navcomm } = await useAsyncData('navcomm', () => {
  return $directus.request($readItem('navigation', '3'))
})
</script>
