import { ref } from 'vue';
import { useRuntimeConfig } from '#imports';
//import { hashPassword } from '@/utils/hashPassword'; // Assuming you have a utility function for password hashing

export function useCustomerRegistration() {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref(null);

  const register = async (email, password, firstname, lastname) => {
    loading.value = true;
    error.value = null;

    try {
      // Validate input
      if (!email || !password || !firstname || !lastname) {
        throw new Error('Please provide all required fields');
      }

      // Hash the password
      //const hashedPassword = await hashPassword(password);

      const response = await $fetch(`${config.public.commerceUrl}/V1/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.COMMERCE_API_TOKEN}` // Fetch token from environment variable
        },
        body: JSON.stringify({
          customer: {
            email,
            firstname,
            lastname,
          },
          password //hashedPassword, // Send hashed password
        }),
      });

      return response; // Response contains customer data
    } catch (err) {
      error.value = err.message; // Set the actual error message
      console.error('Registration error:', err); // Log the error for debugging
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    register,
  };
}
