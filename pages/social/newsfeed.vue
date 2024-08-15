<template>
  <div class="contentPage">
      <!--<profilebar />-->
      <v-row>
          <v-col cols="12">
              <v-card title="Meeovi Social Feed" color="green">
                  <v-sheet class="mx-auto" elevation="0" color="transparent">
                      <h5 style="padding: 15px;">Your Top Posts</h5>
                      <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                          <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
                              <v-col cols="4" v-for="feeds in feeds" :key="feeds">
                                  <v-card :class="['ma-4', selectedClass]" color="white" class="mx-auto" elevated="0" min-height="250px" @click="toggle">
                                      <v-card-title v-html="feeds?.name"></v-card-title>

                                      <v-list lines="one">
                                          <v-list-item :title="feeds?.user_created?.username"
                                              :prepend-avatar="feeds?.user_created?.avatar?.filename_disk">
                                          </v-list-item>
                                      </v-list>

                                      <v-card-text>
                                          <div>
                                              <p v-html="feeds?.post"></p>
                                          </div>
                                      </v-card-text>

                                      <v-card-subtitle><em>Posted:
                                              {{ new Date(feeds?.date_created).toLocaleDateString() }}</em>
                                      </v-card-subtitle>

                                      <v-card-actions>
                                          <v-row>
                                              <v-col cols="3">
                                                  <v-btn title="Comments" prepend-icon="fas fa-comment"
                                                      variant="plain" :href="`/social/feed/${feeds.id}`">()</v-btn>
                                              </v-col>
                                              <v-col cols="3">
                                                  <v-btn title="Repost" prepend-icon="fas fa-repeat" variant="plain"
                                                      @click="repost()">()
                                                  </v-btn>
                                              </v-col>
                                              <v-col cols="3">
                                                  <v-btn title="Like This" prepend-icon="fas fa-heart" variant="plain"
                                                      @click="addLike">()
                                                  </v-btn>
                                              </v-col>
                                              <v-col cols="3">
                                                  <v-btn title="Bookmark" prepend-icon="fas fa-bookmark"
                                                      variant="plain" @click="addBookmark">()
                                                  </v-btn>
                                              </v-col>
                                          </v-row>
                                      </v-card-actions>
                                  </v-card>
                              </v-col>
                          </v-slide-group-item>
                      </v-slide-group>
                  </v-sheet>
              </v-card>
          </v-col>

          <div v-for="members in data?.members?.nodes" :key="members" style="padding-top: 10px;">
              <v-row>
                  <v-col cols="4" v-for="feeds in feeds" :key="feeds">
                      <v-card :class="['ma-4', selectedClass]" color="white" class="mx-auto" elevated="0"
                          min-height="250px" @click="toggle">
                          <v-card-title v-html="feeds?.name"></v-card-title>

                          <v-list lines="one">
                              <v-list-item :title="feeds?.user_created?.username"
                                  :prepend-avatar="feeds?.user_created?.avatar?.filename_disk">
                              </v-list-item>
                          </v-list>

                          <v-card-text>
                              <div>
                                  <p v-html="feeds?.post"></p>
                              </div>
                          </v-card-text>

                          <v-card-subtitle><em>Posted:
                                  {{ new Date(feeds?.date_created).toLocaleDateString() }}</em>
                          </v-card-subtitle>

                          <v-card-actions>
                              <v-row>
                                  <v-col cols="3">
                                      <v-btn title="Comments" prepend-icon="fas fa-comment" variant="plain"
                                          :href="`/social/feed/${feeds.id}`">()</v-btn>
                                  </v-col>
                                  <v-col cols="3">
                                      <v-btn title="Repost" prepend-icon="fas fa-repeat" variant="plain"
                                          @click="repost()">()
                                      </v-btn>
                                  </v-col>
                                  <v-col cols="3">
                                      <v-btn title="Like This" prepend-icon="fas fa-heart" variant="plain"
                                          @click="addLike">()
                                      </v-btn>
                                  </v-col>
                                  <v-col cols="3">
                                      <v-btn title="Bookmark" prepend-icon="fas fa-bookmark" variant="plain"
                                          @click="addBookmark">()
                                      </v-btn>
                                  </v-col>
                              </v-row>
                          </v-card-actions>
                      </v-card>
                  </v-col>
              </v-row>
          </div>
      </v-row>
  </div>
</template>
  
  <script setup>
      const {
        getItems
    } = useDirectusItems()

    const feeds = await getItems({
        collection: "feeds"
    });
 /* import { ref, onMounted } from 'vue';
  import profilebar from '../../components/menus/profilebar.vue';
  import { getActivity } from '~/composables/cms/social/getActivity'; // Import the composable
  
  const activities = ref([]); // Reactive variable to store activity data
  
  onMounted(async () => {
    activities.value = await getActivity(); // Fetch activity data on component mount
  });
  
  const model = ref(null); // Model for v-slide-group*/
  
  // Placeholder methods for actions
  //const repost = () => { /* Implement repost functionality */ };
  //const addLike = () => { /* Implement like functionality */ };
 // const addBookmark = () => { /* Implement bookmark functionality */ }; 
  
  useHead({
    title: 'Social Feed',
  });
  
  definePageMeta({
    //middleware: ['auth-logged-in'],
  });
  </script>
  