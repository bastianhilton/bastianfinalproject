<template>
    <div class="contentPage">
        <!--<profilebar />-->
        <v-card elevation="0" min-height="100vh">
            <v-toolbar title="Social Feed" color="transparent">
                <v-dialog min-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" prepend-icon="fas fa-plus" title="Create a Space" variant="flat">
                            Create a Post
                        </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <createpost />
                    </template>
                </v-dialog>
            </v-toolbar>
            <v-tabs v-model="tab" bg-color="transparent">
                <v-tab value="one">Posts I Follow</v-tab>
                <v-tab value="two">My Posts</v-tab>
                <v-tab value="three">Popular Posts</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <v-row>
                            <v-col cols="3" v-for="(posts, index) in posts" :key="index">
                                <post :post="posts" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        <v-row>
                            <v-col cols="3" v-for="(posts, index) in posts" :key="index">
                                <post :post="posts" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        <v-row>
                            <v-col cols="3" v-for="(posts, index) in posts" :key="index">
                                <post :post="posts" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
    //import profilebar from '../../components/menus/profilebar.vue'
    import {
        ref
    } from 'vue'
    import post from '~/components/cms/related/posts.vue'
    import createpost from '~/components/cms/create/social/createpost'

    const tab = ref(null);
    const dialog = ref(false)

    const {
        $directus,
        $readItems,
    } = useNuxtApp()

    const {
        data: posts
    } = await useAsyncData('posts', () => {
        return $directus.request($readItems('posts'))
    })

    useHead({
        title: 'Feeds',
    })
</script>