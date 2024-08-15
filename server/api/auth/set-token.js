// server/api/auth/set-token.js

export default defineEventHandler(async (event) => {
    const body = await useBody(event); // Parse the request body
    const token = body.token;
  
    // Set the HTTP-only cookie
    setCookie(event, 'customer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  
    return { success: true };
  });
  