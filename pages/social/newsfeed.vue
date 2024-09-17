<template>
  <div class="contentPage">
    <!--<profilebar />-->

    <v-row>
      <v-col cols="12">
        <v-card title="Social Feed" color="green">
          <v-sheet class="mx-auto" elevation="0" color="transparent">
            <h5 style="padding: 15px;">Your Top Posts</h5>
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="(activities, index) in activities" :key="index"
                v-slot="{ isSelected, toggle, selectedClass }">
                <v-col cols="4">
                  <activity :activity="activities" :class="['ma-4', selectedClass]" @click="toggle" />
                </v-col>

                <div class="d-flex fill-height align-center justify-center">
                  <v-scale-transition>
                    <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
                  </v-scale-transition>
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-card>
      </v-col>

      <v-col cols="4" v-for="(activities, index) in activities" :key="index">
        <div style="padding-top: 10px;">
          <activity :activity="activities" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  //import profilebar from '~/components/menus/profilebar.vue';
  import activity from '~/components/cms/related/posts.vue'
  import activities from '~/graphql/cms/queries/activities'
  //import { getActivity } from '~/composables/cms/social/getActivity'; // Import the composable


  const { data } = useAsyncQuery(activities);
  /*const activities = ref([]); 

  onMounted(async () => {
    activities.value = await getActivity(); 
  });
*/
  const model = ref(null); // Model for v-slide-activities

  // Placeholder methods for actions
  const repost = () => {
    /* Implement repost functionality */
  };
  const addLike = () => {
    /* Implement like functionality */
  };
  const addBookmark = () => {
    /* Implement bookmark functionality */
  };

  useHead({
    title: 'Social Feed',
  });

  definePageMeta({
    //middleware: ['auth-logged-in'],
  });
</script>