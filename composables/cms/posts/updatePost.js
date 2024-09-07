// composables/updatePost.js
export default async function updatePost(updateId, postData) {
  const { $directus } = useNuxtApp();

  try {
    $directus.request(updateItem('posts', updateId));
    console.log('Post updated successfully');
  } catch (error) {
    console.error('Error deleting update:', error);
    throw error;
  }
}
