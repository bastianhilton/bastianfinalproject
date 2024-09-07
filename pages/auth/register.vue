<template>
  <div class="authPage">
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
                <strong>Welcome To Meeovi</strong>
              </h2>
              <!-- Display success message -->
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

              <!-- Display error message -->
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
            <div class="form-wrap">
              <div class="mbr-form" data-form-type="formoid">
                <form @submit.prevent="handleRegister" width="500">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    hint="First Name is required"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    label="Last Name"
                    hint="Last Name is required"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="email"
                    v-model="email"
                    label="Email"
                    hint="Email is required"
                    required
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="password"
                    hint="Password is required"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-checkbox label="Become a Seller" v-model="is_seller"></v-checkbox>

                  <v-list lines="one" style="background: transparent;">
                    <v-list-item>
                      <v-list-item-subtitle
                        >By registering to Meeovi.com, you agree to our
                        <a href="/terms-conditions">Terms and Conditions</a>.</v-list-item-subtitle
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle
                        >Already have an account?
                        <a href="/auth/login">Sign In</a></v-list-item-subtitle
                      >
                    </v-list-item>
                  </v-list>

                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block>Sign Up</v-btn>
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
import { ref } from 'vue';
import { useFusionAuth } from '@fusionauth/vue-sdk';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const is_seller = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const { register, error } = useFusionAuth();

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const registrationData = {
      user: {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastname.value,
      },
      registration: {
        applicationId: process.env.FUSIONAUTH_APP_ID, // Your FusionAuth application ID
        data: {
          is_seller: is_seller.value,
        },
      },
    };

    await register(registrationData);

    if (!error.value) {
      successMessage.value = 'Account created successfully! Redirecting to login...';

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } else {
      errorMessage.value = `Registration failed: ${error.value.message}`;
    }
  } catch (err) {
    errorMessage.value = `Registration failed: ${err.message || 'An unexpected error occurred'}`;
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  auth: false,
  layout: false,
});

useHead({
  title: 'Welcome to Meeovi',
});
</script>

<style scoped>
.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
