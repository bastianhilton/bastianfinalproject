<template>
  <div>
    <v-btn class="mt-2 btn btn-primary display-4" @click="logout" block>Logout</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  try {
    // If you're using a token, clear it from localStorage or any other storage
    localStorage.removeItem('token');

    // Optionally, make a call to the backend to handle server-side logout (if needed)
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Redirect the user to the login page
    router.push('/');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>