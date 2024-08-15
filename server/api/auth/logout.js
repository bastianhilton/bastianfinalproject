// server/api/auth/logout.js

export default defineEventHandler(async (event) => {
    // Clear the HTTP-only cookie
    setCookie(event, 'customer_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: -1, // Expire the cookie
    });
  
    return { success: true };
  });
  