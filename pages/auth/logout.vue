<template>
    <div>
        <h1>Logging out...</h1>
    </div>
</template>

<script setup>
    import {
        useRouter
    } from 'vue-router';
    const fusionAuth = inject('fusionAuth'); // Access the FusionAuth client
    const router = useRouter();

    onMounted(async () => {
        try {
            // Clear local access token
            localStorage.removeItem('access_token');

            // Redirect to FusionAuth logout page
            await fusionAuth.logout();

            // After logout, you can redirect the user to the homepage or a custom page
            router.push('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
</script>