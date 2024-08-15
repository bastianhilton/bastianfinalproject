// composables/useCustomerLogout.js

export function useCustomerLogout() {
  const logout = async () => {
    // Invalidate the token on the server by clearing the cookie
    await $fetch('/api/auth/logout', {
      method: 'POST',
    });
  };

  return {
    logout,
  };
}
