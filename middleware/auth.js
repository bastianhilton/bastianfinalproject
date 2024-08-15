// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('customerToken');
  if (!token) {
    return navigateTo('/auth/login');
  }
});
