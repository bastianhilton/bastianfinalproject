<template>
  <div class="authPage">
   <!-- <iframe style="position: relative; height: 100vh !important;" frameborder="0"
            allow="clipboard-write;camera;geolocation;fullscreen" :src="`${url}meeovi-authentication`"></iframe>-->
  <section
      data-bs-version="5.1"
      class="form2 shopm5 cid-umoq9RvANO mbr-parallax-background"
      id="aform2-a3"
      data-sortbtn="btn-primary"
    >
      <div
        class="mbr-overlay"
        style="opacity: 0.3; background-color: rgb(255, 255, 255);"
      ></div>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col content-wrap">
            <div class="mbr-section-head">
              <img
                src="../../assets/images/logo512alpha-128x128.png"
                alt="Meeovi Logo"
                class="authLogo"
              />
              <h2 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Welcome Back</strong>
              </h2>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
            <div class="form-wrap">
              <div class="mbr-form" data-form-type="formoid">
                <form width="500" @submit.prevent="handleLogin">
                  <v-text-field
                    type="email"
                    v-model="email"
                    label="Email*"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="Password*"
                    required
                  ></v-text-field>

                  <v-list lines="one" style="background: transparent;">
                    <v-list-item>
                      <v-list-item-title
                        >Forgot your password?.
                        <a href="/auth/forgot-password">Reset It Here</a></v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title
                        >Don't have an account?. <a href="/auth/register">Signup Here</a></v-list-item-title
                      >
                    </v-list-item>
                  </v-list>

                  <v-btn
                    class="mt-2 btn btn-primary display-4"
                    type="submit"
                    >Login</v-btn
                  >
                </form>
              </div>
            </div>
            <p class="comment-text mbr-fonts-style align-center mb-0 display-7">
              We respect your privacy, so we never share your info.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/*import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const url = config.public.budibaseEmbed;*/
import { ref } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const websiteId = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        website_id: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle successful login
      console.log('Login successful:', data);
      errorMessage.value = ''; // Clear any previous error message
      router.push('/'); // Redirect to the homepage
    } else {
      const errorData = await response.json();
      // Handle login error
      errorMessage.value = errorData.statusMessage || 'Login failed';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.value = 'An unexpected error occurred';
  }
};


definePageMeta({
  auth: false,
  layout: 'auth',
});
</script>
