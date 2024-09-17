<template>
  <div>
    <v-card :class="['ma-4', selectedClass]" color="white" class="mx-auto" elevated="0" min-height="250px"
      @click="toggle">
      <v-card-title v-html="activity?.title"></v-card-title>

      <v-list lines="one">
        <v-list-item :title="activity?.creator?.username" :prepend-avatar="activity?.creator?.avatar?.url">
        </v-list-item>
      </v-list>

      <v-card-text>
        <div>
          <p v-html="activity?.content"></p>
        </div>
      </v-card-text>

      <v-card-subtitle><em>Posted: {{ new Date(activity?.date).toLocaleDateString() }}</em></v-card-subtitle>

      <v-card-actions>
        <v-row>
          <v-col cols="3">
            <v-btn title="Comments" prepend-icon="fas fa-comment" variant="plain" :href="`/social/feed/${activity?.id}`">
              ()</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Repost" prepend-icon="fas fa-repeat" variant="plain" @click="repost()">()</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Like This" prepend-icon="fas fa-heart" variant="plain" @click="addLike()">()</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Bookmark" prepend-icon="fas fa-bookmark" variant="plain" @click="addBookmark()">()</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  const model = ref(null)
  const props = defineProps({
    activity: {
      type: Object,
      required: true,
    },
  });
  const {
    activity
  } = props;
</script>