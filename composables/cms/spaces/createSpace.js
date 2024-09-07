// composables/createSpace.js
import { createItem } from '@directus/sdk';

export default async function createSpace(spaceData) {
    const { $directus } = useNuxtApp();
  
    try {
      const space = await $directus.request(createItem('spaces', spaceData));
      return space;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  }
  