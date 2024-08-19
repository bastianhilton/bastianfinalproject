import { getUserByToken } from '~/server/api/auth/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('auth_token').value;

  if (token) {
    const user = await getUserByToken(token);
    if (user) {
      useState('user', () => user); // Store user info in state
    } else {
      deleteCookie('auth_token');
      return navigateTo('/auth/login');
    }
  } else {
    useState('user', () => null); // No user is logged in
  }
});
