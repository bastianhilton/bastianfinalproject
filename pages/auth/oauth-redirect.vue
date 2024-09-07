<template>
    <div>
        <h1>Logging in...</h1>
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
            const token = await fusionAuth
        .exchangeCodeForToken(); // Exchanges the authorization code for access token
            if (token) {
                // Store the access token (e.g., in localStorage or a cookie)
                localStorage.setItem('access_token', token.access_token);

                // Redirect to homepage or dashboard
                router.push('/');
            }
        } catch (error) {
            console.error('Error exchanging code for token:', error);
        }
    });
</script>