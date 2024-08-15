// server/api/auth/check-auth.js

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'customer_token');
  
    // Optionally validate the token by calling Magento's API or using a custom logic
    if (token) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  });
  