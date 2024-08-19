import { resetPassword } from '~/server/api/auth/auth';

export default defineEventHandler(async (event) => {
  const { email, newPassword } = await readBody(event);
  await resetPassword(email, newPassword);
  return { success: true };
});
