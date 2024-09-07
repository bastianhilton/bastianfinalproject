// composables/uploadFiles.js
import { uploadFiles } from '@directus/sdk';

export default async function uploadFile({ imageFile, documentFile }) {
    const { $directus } = useNuxtApp();
    const uploadedFiles = {};
  
    try {
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append('file', imageFile);
        const uploadedImage = await $directus.request(uploadFiles(formDataImage));
        uploadedFiles.imageId = uploadedImage.id;
      }
  
      if (documentFile) {
        const formDataDocument = new FormData();
        formDataDocument.append('file', documentFile);
        const uploadedDocument = await $directus.request(uploadFiles(formDataDocument));
        uploadedFiles.documentId = uploadedDocument.id;
      }
  
      return uploadedFiles;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  }
  