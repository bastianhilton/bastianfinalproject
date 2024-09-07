// composables/useAuth.js

export const useAuth = () => {
    const token = useCookie('auth_token'); // Store token in a cookie
    const error = ref(null);
  
    const login = async (username, password) => {
      try {
        const response = await useFetch(`${config.public.commerceUrl}/rest/V1/integration/customer/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            username,
            password,
          },
        });
  
        if (response.data) {
            token.value = response.data; // Save the token in the cookie
            error.value = null;
          } else {
            error.value = 'Login failed. Please check your credentials.';
          }
        } catch (err) {
          error.value = 'An error occurred during login.';
          console.error(err);
        }
      };
    
      const logout = () => {
        token.value = null; // Clear the token from the cookie
      };
    
      return {
        token,
        error,
        login,
        logout,
      };
    };
  