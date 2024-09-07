<template>
  <v-btn @click="signIn('fusionauth', { callbackUrl: '/' })">Login / Register</v-btn>
</template>

<script setup lang="ts">
const { status, signIn } = useAuth();
</script>