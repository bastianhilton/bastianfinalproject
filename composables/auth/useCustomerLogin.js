// composables/useCustomerLogin.js

import { ref } from 'vue';
import { useRuntimeConfig } from '#imports';

export function useCustomerLogin() {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref(null);

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;

    try {
      const token = await $fetch(`${config.public.commerceUrl}/rest/V1/integration/customer/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.public.commerceApiToken}`
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      // Send the token to your server-side API to set the HTTP-only cookie
      await $fetch('/api/auth/set-token', {
        method: 'POST',
        body: {
          token,
        },
      });

      return token;
    } catch (err) {
      error.value = err.response?.data?.message || 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    login,
  };
}
