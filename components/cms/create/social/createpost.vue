<template>
    <div>
        <form @submit.prevent="createActivityAndRefresh">
            <v-card>
                <v-card-text>
                    <v-textarea v-model="content" label="What's happening?*" variant="outlined" required></v-textarea>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input v-model="image" @change="handleImageUpload" chips multiple clearable density="compact"
                                prepend-icon="fas fa-image" accept="image/*" label="Photo"
                                variant="solo-inverted"></v-file-input>
                        </v-col>
                        <v-col cols="12">
                            <v-file-input v-model="media" @change="handleDocumentUpload" chips multiple clearable density="compact"
                                prepend-icon="fas fa-video" accept=".docx, .txt, .pdf, video/*" label="Files" variant="solo-inverted">
                            </v-file-input>
                        </v-col>
                        <v-col cols="2">
                            <v-menu :location="location">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props" size="large" v-model="reactions">
                                        <v-icon icon="fas fa-face-smile"></v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-row>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="orange" icon="fas fa-face-smile"></v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="amber" icon="fas fa-face-smile-wink"></v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="green" icon="fas fa-face-smile-beam"></v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="blue-grey" icon="fas fa-face-laugh-squint">
                                                        </v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="blue" icon="fas fa-face-grin-squint-tears">
                                                        </v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="purple-lighten-1" icon="fas fa-face-grin-squint">
                                                        </v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="pink-darken-4" icon="fas fa-face-grin-hearts">
                                                        </v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="brown" icon="fas fa-face-grin-beam-sweat">
                                                        </v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-btn href="" variant="text" v-model="reactions">
                                                    <v-list-item-title>
                                                        <v-icon color="red" icon="fas fa-heart"></v-icon>
                                                    </v-list-item-title>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                        <v-col cols="10">
                            <v-file-input v-model="image" chips clearable density="compact"
                                prepend-icon="fas fa-sheet-plastic" label="Choose a background" variant="solo-inverted">
                            </v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" type="submit" @click="reset = false">
                            Reset
                        </v-btn>
                    <v-btn color="blue-darken-1" @click="updatePost" variant="text" type="submit">
                            Post
                        </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </div>
</template>

<script>
    export default {
        methods: {
            reset () {
                this.$refs.form.reset()
            },
        },
    }
</script>

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

const updatePost = async () => {
  try {
    const uploadedFiles = await uploadFiles({
      imageFile: imageFile.value,
      documentFile: documentFile.value,
    });

    const post = await $directus.request(
	createItem('posts', {
		content: content.value,
        media: media.value = uploadedFiles.documentId,
        image: image.value = uploadedFiles.imageId
	})
);
    console.log('Created Post:', post);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
</script>