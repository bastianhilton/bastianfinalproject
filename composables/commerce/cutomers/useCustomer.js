const fetchCustomerDetails = async () => {
  try {
    const token = localStorage.getItem('customerToken');
    const config = useRuntimeConfig();
    
    const response = await fetch(`${config.public.commerceUrl}/rest/V1/customers/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching customer details:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const customerData = await response.json();
    console.log('Customer details:', customerData);
  } catch (error) {
    console.error('Error fetching customer details:', error);
  }
};
