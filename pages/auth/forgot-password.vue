<template>
  <div>
    <section data-bs-version="5.1" class="header2 supplym5 cid-ujDY4O2LRw mbr-fullscreen" id="header2-a1"
      data-sortbtn="btn-primary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="title-wrapper">
              <h1 class="mbr-section-title mbr-fonts-style display-1">Forgot Password</h1>
              <div class="mbr-section-btn">
                <form @submit.prevent="requestPasswordReset" width="500">
                  <v-text-field type="email" v-model="email" label="Enter Email for Password Reset" required></v-text-field>
                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block>Request Password Reset</v-btn>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="image-wrapper">
              <img class="image_1" src="../../../assets/images/mbr-500x750.jpg" alt="">
              <img class="image_2" src="../../../assets/images/mbr-600x593.jpg" alt="">
              <img class="image_3" src="../../../assets/images/mbr-500x333.jpg" alt="">
              <img class="image_4" src="../../../assets/images/mbr-560x747.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const message = ref('');

const requestPasswordReset = async () => {
  try {
    const response = await fetch('/api/auth/requestReset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      message.value = 'Password reset email sent. Please check your inbox.';
    } else {
      message.value = data.body || 'Failed to request password reset';
    }
  } catch (error) {
    message.value = 'An error occurred';
    console.error('Error requesting password reset:', error);
  }
};

useHead({
  title: "Forgot Password"
});

definePageMeta({
        auth: false,
        //middleware: 'guest',
        layout: false,
    });
</script>

<style scoped>
.message {
  margin-top: 10px;
  color: green;
}
</style>
