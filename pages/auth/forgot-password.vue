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
                <v-form fast-fail @submit.prevent="onSubmit" width="500">
                  <v-text-field type="email" v-model="email" label="Enter Email for Password Reset" required></v-text-field>
                  <v-btn class="mt-2 btn btn-primary display-4" type="submit" block>Send Reset Email</v-btn>
                </v-form>
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
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports';
import {useForm} from 'vee-validate';
import {object, string} from 'yup';

const config = useRuntimeConfig();
const email = ref('')

const appConfig = useAppConfig();

const loading = ref(false);
const error = ref();
const success = ref(false);

const {handleSubmit} = useForm({
  validationSchema: object({
    email: string().required().label('Email'),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = '';
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: values,
    });
    success.value = true;
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

useHead({
  title: "Forgot Password"
});

definePageMeta({
        auth: false,
        //middleware: 'guest',
        layout: false,
    });
</script>
