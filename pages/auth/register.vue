<template>
  <div>
    <section data-bs-version="5.1" class="header2 supplym5 cid-ujDY4O2LRw mbr-fullscreen" id="header2-a1"
      data-sortbtn="btn-primary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="title-wrapper">
              <h1 class="mbr-section-title mbr-fonts-style display-3">Welcome to Meeovi</h1>
              <div class="mbr-section-btn">
                <v-form fast-fail @submit.prevent="createCustomer" width="500">
                  <v-text-field v-model="firstname" label="First Name" required></v-text-field>
                  <v-text-field v-model="lastname" label="Last Name" required></v-text-field>

                  <v-text-field type="email" v-model="email" label="Email" required></v-text-field>

                  <v-text-field type="password" v-model="password" label="Password" required></v-text-field>

                  <v-text-field type="password" v-model="confirmPassword" label="Confirm Password" required></v-text-field><!---->
                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block>Sign Up</v-btn>
                </v-form>

                <p>Already have an account? <a href="/auth/login">Sign In</a></p>
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

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const createCustomer = async () => {
  const customerData = {
    customer: {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
    },
    password: password.value,
  };

  try {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.commerceUrl}/rest/V1/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.public.commerceApiToken}`
      },
      body: JSON.stringify(customerData),
    });

    const data = await response.json();
    console.log('Customer created:', data);
    router.push('/auth/login');
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};

useHead({
  title: 'Welcome to Meeovi',
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