<template>
  <div>
    <section data-bs-version="5.1" class="header2 supplym5 cid-ujDY4O2LRw mbr-fullscreen" id="header2-a1"
      data-sortbtn="btn-primary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="title-wrapper">
              <h1 class="mbr-section-title mbr-fonts-style display-1">Welcome Back</h1>
              <!-- Display success message -->
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

              <!-- Display error message -->
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

              <div class="mbr-section-btn">
                <form width="500" @submit.prevent="login">
                  <v-text-field type="email" v-model="email" label="Email"></v-text-field>
                  <v-text-field type="password" v-model="password_hash" label="Password"></v-text-field>

                  <v-list lines="one" style="background: transparent;">
                    <v-list-item>
                      <v-list-item-subtitle>Forgot your password?. <a href="/auth/forgot-password">Reset It Here</a>
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>

                  <v-btn class="mt-2 btn btn-primary display-4" type="submit">Login
                  </v-btn>
                </form>
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

const router = useRouter();

const email = ref('');
const password_hash = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const login = async () => {
  const loginData = {
    email: email.value,
    password_hash: password_hash.value,
  };

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      successMessage.value = 'Login successful! Redirecting to Homepage...';
      console.log('Login successful:', data);

      // Optionally store the JWT token in localStorage or cookie
      localStorage.setItem('token', data.token);

     // Redirect after a short delay to allow the user to see the success message
     setTimeout(() => {
        router.push('/');
      }, 1500); // 2-second delay
    } else {
      errorMessage.value = data.body || 'Login failed';
      console.error('Login error:', data);
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login';
    console.error('Login error:', error);
  }
};


  useHead({
    title: 'Welcome Back',
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
.success-message {
  color: green;
  margin-top: 10px;
}
</style>