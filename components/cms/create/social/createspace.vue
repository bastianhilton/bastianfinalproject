<template>
    <div>
        <v-row justify="center">
            <v-card>
                <form @submit.prevent="createGroupAndRefresh">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon icon="fas fa-circle-xmark"></v-icon>
                        </v-btn>
                        <v-card-title>
                            <span class="text-h6">Create a new Space</span>
                        </v-card-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="name" id="spaceName" label="Space Name*" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="type" label="What type of space is this?" :items="typeItems"></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="status" label="Is this space public or private?" :items="statusItems"></v-select>
                                </v-col><!---->
                                <v-col cols="12">
                                    <v-textarea v-model="description" label="Description" id="spaceDescription">
                                    </v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-file-input v-model="image" @change="handleImageUpload" clearable density="compact"
                                        prepend-icon="fas fa-image" accept="image/*" label="Image for Banner"
                                        variant="solo-inverted"></v-file-input>
                                </v-col>
                                <v-col cols="6">
                                    <v-file-input v-model="avatar" @change="onFileChange('avatar', $event)" clearable density="compact"
                                        prepend-icon="fas fa-image" accept="image/*" label="Image for Avatar"
                                        variant="solo-inverted"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" type="submit" @click="newSpace">
                            Create Space
                        </v-btn>
                    </v-card-actions>
                    <div v-if="errorMessage">{{ errorMessage }}</div>
                    <div v-if="successMessage">{{ successMessage }}</div>
                </form>
            </v-card>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import uploadFiles from '~/composables/cms/content/uploadFiles';
import createSpace from '~/composables/cms/spaces/createSpace';
import { createItem } from '@directus/sdk';

const { $directus } = useNuxtApp();
const dialog = ref(false);
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);

const location = ref('bottom');
const name = ref('');
const typeItems = ref(['Default', 'Audio', 'Video']);
const statusItems = ref(['Public', 'Private', 'Hidden']);
const description = ref('');
const numberOfMembers = ref('');
const type = ref('');
const creator = ref('');
const status = ref('');
const id = ref('');
const avatar = ref(null);
const image = ref(null);

const imageFile = ref(null);
const documentFile = ref(null);

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

const handleDocumentUpload = (event) => {
  documentFile.value = event.target.files[0];
};

const newSpace = async () => {
  try {
    const uploadedFiles = await uploadFiles({
      imageFile: imageFile.value,
      documentFile: documentFile.value,
    });

    const spacePayload = {
      name: name.value,
      description: description.value || null,
      numberOfMembers: numberOfMembers.value ? parseInt(numberOfMembers.value) : null,
      type: type.value || null,
      creator: creator.value || null,
      status: status.value || null,
      avatar: uploadedFiles.documentId || null,
      image: uploadedFiles.imageId || null,
    };

    const space = await $directus.request(createItem('spaces', spacePayload));

    console.log('Created Space:', space);
  } catch (error) {
    console.error('Error creating space:', error);
  }
};

</script>