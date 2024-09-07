// composables/createPost.js
import { createItem } from '@directus/sdk';

export default async function createPost(postData) {
    const { $directus } = useNuxtApp();
  
    try {
      const post = await $directus.request(createItem('posts', postData));
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }
  