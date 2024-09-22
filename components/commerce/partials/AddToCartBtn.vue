<template>
  <button @click="redirectToCheckout">Checkout</button>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Use your Publishable Key here

const redirectToCheckout = async () => {
  const stripe = await stripePromise;
  // Replace with your server API call
  const { id } = await $fetch('/api/commerce/checkout', {
    method: 'POST',
    body: {
      items: [
        { price: 'price_1XXXXXXX', quantity: 1 }, // Replace with your actual price ID
      ],
    },
  });

  if (stripe) {
    await stripe.redirectToCheckout({ sessionId: id });
  }
};
</script>
