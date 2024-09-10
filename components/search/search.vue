<template>
  <div>
    <v-text-field id="mainSearch" density="compact" variant="solo" label="Search Meeovi" append-inner-icon="fas fa-search" single-line
        hide-details v-model="searchQuery" @keyup.enter="submitSearch"></v-text-field>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // For programmatic navigation

const searchQuery = ref('');
const router = useRouter();

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/results', query: { q: searchQuery.value.trim() } });
  }
};
</script>