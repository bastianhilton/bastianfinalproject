import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Check if the user is logged in using Pinia's state
  if (!authStore.isLoggedIn) {
    // Save the original route they were trying to access
    const returnUrl = to.fullPath;

    // Redirect to the login page with the return URL as a query parameter
    return navigateTo({
      path: '/auth/login',
      query: { returnUrl }
    });
  }

  try {
    // Fetch the user information using the token stored in Pinia
    if (!authStore.user) {
      await authStore.fetchUser();
    }

    // If the user data is available, allow the user to proceed
    console.log('User data:', authStore.user);
  } catch (err) {
    console.error('Authentication error:', err);

    // If there's an error (e.g., invalid token), remove the token and redirect to login
    authStore.removeToken();
    return navigateTo('/auth/login');
  }
});
