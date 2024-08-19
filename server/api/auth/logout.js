import { logoutUser } from '~/server/api/auth/auth';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  const user = await getUserByToken(token);
  if (user) {
    await logoutUser(user.entity_id);
    deleteCookie(event, 'auth_token');
  }
  return { success: true };
});
