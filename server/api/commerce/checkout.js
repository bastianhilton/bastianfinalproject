import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripeSecretKey); // Get the secret key from runtimeConfig

  try {
    // Define your items, amount, and other settings here
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.public.baseUrl}?success=true`, // Replace with your actual success URL
      cancel_url: `${config.public.baseUrl}?canceled=true`, // Replace with your actual cancel URL
    });

    return { url: session.url };
  } catch (error) {
    return { error: error.message };
  }
});
