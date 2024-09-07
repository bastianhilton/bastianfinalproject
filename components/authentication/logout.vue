<template>
  <v-btn @click="signOut('fusionauth', { callbackUrl: '/' })" variant="text" text="Logout"></v-btn>
</template>

<script setup>
//import { useAuthStore } from '~/store/auth';
//import { useFusionAuth } from "@fusionauth/vue-sdk";
const { signOut } = useAuth();

/*const {
  logout
} = useFusionAuth();*/

//const authStore = useAuthStore();

/*const logout = () => {
  authStore.logout();
};*/
</script>