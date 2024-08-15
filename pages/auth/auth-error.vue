<template>
    <h1> Authentication error {{ errorCode }}. Please try again! </h1>
</template>

<script setup>
// Remember to disable the middleware protection from your page!
definePageMeta({
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})


const route = useRoute()
const errorCode = computed(() => route.params.error)
</script>