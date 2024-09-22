<template>
  <section class="checkoutSession">
    <v-btn class="checkoutBtn" @click="handleCheckout" role="link">
      Checkout
    </v-btn>
  </section>
</template>

<script setup>
  import {
    useRuntimeConfig
  } from '#app';
  import {
    loadStripe
  } from '@stripe/stripe-js';
  import {
    onMounted
  } from 'vue';

  const config = useRuntimeConfig();
  const stripePromise = loadStripe(config.public.stripePublishableKey);

  onMounted(() => {
    // Check for success or cancel query parameters
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  });

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      // Call the server endpoint to create a checkout session
      const response = await $fetch('/api/checkout_sessions', {
        method: 'POST',
      });

      if (response.url) {
        window.location.href = response.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
</script>

<style scoped>
  .checkoutSession {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    top: 50px;
    width: 400px;
    height: 80vh;
    border-radius: 6px;
    justify-content: space-between;
  }

  .checkoutBtn {
    height: 36px;
    background: #556cd6;
    border-radius: 4px;
    color: white;
    border: 0;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

  .checkoutBtn:hover {
    opacity: 0.8;
  }
</style>