<template>
    <div>
        <v-card elevation="0">
            <form>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="name" id="spaceName" label="Space Name*">
                                </v-text-field>
                            </v-col>
                            <!--<v-col cols="6">
                                <v-select v-model="type" label="What type of space is this?" :items="typeItems">
                                </v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="status" label="Is this space public or private?"
                                    :items="statusItems"></v-select>
                            </v-col>-->
                            <v-col cols="12">
                                <v-textarea v-model="description" label="Description" id="spaceDescription">
                                </v-textarea>
                            </v-col>
                            <v-col cols="6">
                                <v-file-input @change="onFileChange('cover', $event)" clearable density="compact"
                                    prepend-icon="fas fa-image" accept="image/*" label="Image for Cover"
                                    variant="solo-inverted"></v-file-input>
                            </v-col>
                            <v-col cols="6">
                                <v-file-input @change="onFileChange('avatar', $event)" clearable density="compact"
                                    prepend-icon="fas fa-image" accept="image/*" label="Image for Avatar"
                                    variant="solo-inverted"></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="text" type="submit" @click.prevent="deleteGroupAndRefresh">
                        Delete Space
                    </v-btn>

                    <v-btn color="primary" variant="text" type="submit" @click.prevent="updateGroupAndRefresh">
                        Update Space
                    </v-btn>
                </v-card-actions>
                <div v-if="errorMessage">{{ errorMessage }}</div>
                <div v-if="successMessage">{{ successMessage }}</div>
            </form>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import uploadFiles from '~/composables/cms/content/uploadFiles';
import createPost from '~/composables/cms/posts/createPost';
import { createItem } from '@directus/sdk';

const { $directus } = useNuxtApp();
const dialog = ref(false)
const location = ref('bottom');
const content = ref('');
const media = ref(null);
const image = ref(null);

const imageFile = ref(null);
const documentFile = ref(null);

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

const handleDocumentUpload = (event) => {
  documentFile.value = event.target.files[0];
};

const createNewPost = async () => {
  try {
    const uploadedFiles = await uploadFiles({
      imageFile: imageFile.value,
      documentFile: documentFile.value,
    });

    const post = await $directus.request(
	updateItem('posts', {
		content: content.value,
        media: media.value = uploadedFiles.documentId,
        image: image.value = uploadedFiles.imageId
	})
);
    console.log('Updated Post:', post);
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
</script>