<template>
  <div>
    <section data-bs-version="5.1" class="header2 supplym5 cid-ujDY4O2LRw mbr-fullscreen" id="header2-a1"
      data-sortbtn="btn-primary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="title-wrapper">
              <h1 class="mbr-section-title mbr-fonts-style display-1">Welcome Back</h1>
              <div class="mbr-section-btn">
                <v-form fast-fail @submit.prevent="loginCustomer" width="500">
                  <v-text-field type="email" v-model="email" label="Email"></v-text-field>
                  <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block @click="signIn('credentials')">Login</v-btn>
                </v-form>
                <!--<div v-for="provider in providers" :key="provider.id">
                    <v-btn @click="signIn(provider.id)">Sign in with {{ provider.name }}</v-btn>
                  </div>-->
                <p>Forgot your password?. <a href="/account/user/auth/forgot-password">Reset It Here</a></p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="image-wrapper">
              <img class="image_1" src="../../assets/images/mbr-500x750.jpg" alt="">
              <img class="image_2" src="../../assets/images/mbr-600x593.jpg" alt="">
              <img class="image_3" src="../../assets/images/mbr-500x333.jpg" alt="">
              <img class="image_4" src="../../assets/images/mbr-560x747.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#imports';

const router = useRouter();

const email = ref('');
const password = ref('');

const loginCustomer = async () => {
  const loginData = {
    username: email.value,
    password: password.value,
  };

  try {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.commerceUrl}/rest/V1/integration/customer/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const token = await response.json();
    console.log('Customer token:', token);

    // Store the token locally (e.g., in localStorage)
    localStorage.setItem('customerToken', token);

    // Redirect to a protected route or home page
    router.push('/');
  } catch (error) {
    console.error('Error logging in customer:', error);
  }
};


useHead({
  title: 'Customer Login',
});

definePageMeta({
  auth: false,
  layout: false,
});
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>