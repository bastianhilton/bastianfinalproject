<template>
  <div class="cartPage">
    <!-- Display a payment form -->
    <div id="checkout">
        <!-- Checkout will insert the payment form here -->
      </div>
  </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(useRuntimeConfig().public.stripePublishableKey)

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}

  definePageMeta({
    layout: 'nolive',
    middleware: ['auth'],
  });
  
  useHead({
    title: 'Checkout',
  })
</script>