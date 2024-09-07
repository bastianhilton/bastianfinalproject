<template>
    <div class="contentPage">
        <!--<profilebar />-->
        <v-card elevation="0" min-height="100vh">
            <v-toolbar title="Spaces" color="transparent">
                <v-dialog min-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" prepend-icon="fas fa-plus" title="Create a Space" variant="flat">
                            Create a Space
                        </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <createspace />
                    </template>
                </v-dialog>
            </v-toolbar>
            <v-tabs v-model="tab" bg-color="transparent">
                <v-tab value="one">All Spaces</v-tab>
                <v-tab value="two">Audio</v-tab>
                <v-tab value="three">Video</v-tab>
                <v-tab value="four">Joined</v-tab>
                <v-tab value="five">My Spaces</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <v-row>
                            <v-col cols="4" v-for="(spaces, index) in groups" :key="index">
                                <spaces :space="spaces" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        <v-row>
                            <v-col cols="4" v-for="(spaces, index) in audiogroup" :key="index">
                                <spaces :space="spaces" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        <v-row>
                            <v-col cols="4" v-for="(spaces, index) in videogroup" :key="index">
                                <spaces :space="spaces" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="four">
                        <v-row>
                            <v-col cols="4" v-for="(spaces, index) in groups" :key="index">
                                <spaces :space="spaces" />
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="five">
                        <v-row>
                            <v-col cols="4" v-for="(spaces, index) in groups" :key="index">
                                <spaces :space="spaces" />
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
    import { ref } from 'vue'
    import spaces from '~/components/cms/related/spaces.vue'
    import createspace from '~/components/cms/create/social/createspace'

    const tab = ref(null);
    const dialog = ref(false)
    
    const {
        $directus,
        $readItems,
    } = useNuxtApp()
    const route = useRoute()

    const {
        data: groups
    } = await useAsyncData('groups', () => {
        return $directus.request($readItems('spaces'))
    })

    const {
        data: audiogroup
    } = await useAsyncData('audiogroup', () => {
        return $directus.request($readItems('spaces', {
            filter: {
                type: {
                    _eq: "Audio"
                }
            }
        }))
    })

    const {
        data: videogroup
    } = await useAsyncData('videogroup', () => {
        return $directus.request($readItems('spaces', {
            filter: {
                type: {
                    _eq: "Video"
                }
            }
        }))
    })

    useHead({
        title: 'Spaces',
    })
</script>