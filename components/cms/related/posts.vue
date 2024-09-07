<template>
  <div>
    <v-card :class="['ma-4', selectedClass]" color="white" class="mx-auto" elevated="0" min-height="250px"
      @click="toggle">
      <v-list lines="one">
        <v-list-item :title="post?.username" :prepend-avatar="post?.user_avatar">
        </v-list-item>
      </v-list>

      <v-card-text>
        <div>
          <img :src="`${url}/assets/${post?.image?.filename_disk}`" :alt="post?.content" />
          <p v-html="post?.content"></p>
        </div>
      </v-card-text>

      <v-card-subtitle><em>Posted:
          {{ new Date(post?.date_created).toLocaleDateString() }}</em>
      </v-card-subtitle>

      <v-card-actions>
        <v-row>
          <v-col cols="3">
            <v-btn title="Comments" prepend-icon="fas fa-comment" variant="plain" :href="`/social/feed/${post.id}`">()
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Repost" prepend-icon="fas fa-repeat" variant="plain" @click="repost">()
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Like This" prepend-icon="fas fa-heart" variant="plain" @click="addLike">()
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn title="Bookmark" prepend-icon="fas fa-bookmark" variant="plain" @click="addBookmark">()
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: process.env.DIRECTUS_URL || 'http://89.116.38.24:8011'
    }
  }
}
</script>

<script setup>
  import {
    ref
  } from 'vue'
  import { useRuntimeConfig } from '#imports';

  const config = useRuntimeConfig();
  const model = ref(null)
  const props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  });
  const {
    post
  } = props;
</script>