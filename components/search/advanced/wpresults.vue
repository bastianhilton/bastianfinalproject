<template>
    <div>
        <div v-if="spaces.length">
            <v-row>
                <v-col cols="3" v-for="(result, index) in spaces" :key="index">
                    <spaces :space="result" />
                </v-col>
            </v-row>
        </div>
        <p v-else>No spaces found.</p>

        <!-- Pagination Component -->
        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" @input="fetchSearchResults">
        </v-pagination>
    </div>
</template>

<script setup>
    import {
        ref,
        onMounted,
        watch
    } from 'vue';
    import {
        useRouter,
        useRoute
    } from 'vue-router';
    import spaces from '~/components/cms/related/spaces.vue';

    const tab = ref(null);
    const group = ref(null);
    const drawer = ref(false);
    const searchQuery = ref('');
    const currentPage = ref(1); // Track the current page
    const totalPages = ref(1); // Track the total number of pages
    const pageSize = ref(10); // Number of spaces per page
    const route = useRoute();
    const config = useRuntimeConfig();

    const fetchSearchResults = async () => {
        try {
            const response = await $fetch(
                `${config.public.wordpressUrl}/wp-json/wp/v2/search/?search=${searchQuery.value}`);
            spaces.value = response;
            // Check if the response has headers and a get method
            if (response.headers && typeof response.headers.get === 'function') {
                const totalItems = response.headers.get('X-WP-Total')
                // Calculate the total number of pages
            } else {
                // Handle the case where the headers or get method is not available
                console.warn('Unable to retrieve total number of search results from headers')
                totalPages.value = 1 // Set totalPages to 1 as a fallback
            }
        } catch (error) {
            console.error('Error fetching search spaces:', error);
            spaces.value = [];
        }
    };

    // Fetch spaces on component mount and when the query changes
    onMounted(fetchSearchResults);
    watch(() => route.query.q, (newQuery) => {
        searchQuery.value = newQuery || '';
        fetchSearchResults();
    });
</script>