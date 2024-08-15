const logoutCustomer = () => {
  localStorage.removeItem('customerToken');
  router.push('/auth/login');
};
