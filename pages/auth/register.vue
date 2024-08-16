<template>
  <div>
    <section data-bs-version="5.1" class="header2 supplym5 cid-ujDY4O2LRw mbr-fullscreen" id="header2-a1" data-sortbtn="btn-primary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="title-wrapper">
              <h1 class="mbr-section-title mbr-fonts-style display-3">Welcome to Meeovi</h1>
              <!-- Display success message -->
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

              <!-- Display error message -->
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

              <div class="mbr-section-btn">
                <form @submit.prevent="createCustomer" width="500">
                  <v-text-field v-model="firstname" label="First Name" hint="First Name is required" required></v-text-field>
                  <v-text-field v-model="lastname" label="Last Name" hint="Last Name is required" required></v-text-field>
                  <v-text-field type="email" v-model="email" label="Email" hint="Email is required" required></v-text-field>
                  <v-text-field type="password" v-model="password_hash" hint="Password is required" label="Password" required></v-text-field>
                  <v-checkbox label="Become a Seller" v-model="is_seller"></v-checkbox>

                  <v-list lines="one" style="background: transparent;">
                    <v-list-item>
                      <v-list-item-subtitle>By registering to Meeovi.com, you agree to our <a href="/terms-conditions">Terms and Conditions</a>.
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle>Already have an account? <a href="/auth/login">Sign In</a></v-list-item-subtitle>
                    </v-list-item>
                  </v-list>

                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block>Sign Up</v-btn>
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

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password_hash = ref('');
const website_id = ref(1);
const is_seller = ref(false); // Default to false if not selected
const created_in = ref('Default Store View')
const successMessage = ref('');
const errorMessage = ref('');

const createCustomer = async () => {
  const customerData = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password_hash: password_hash.value,
    website_id: website_id.value,
    is_seller: is_seller.value,
    created_in: created_in.value
  };

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      console.log('Customer created:', data);
      successMessage.value = 'Account created successfully! Redirecting to login...';

      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000); // 2-second delay
    } else {
      errorMessage.value = data.message || 'Error creating account. Please try again.';
    }
  } catch (error) {
    console.error('Error during customer creation:', error);
    errorMessage.value = 'An unexpected error occurred. Please try again.';
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
.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
