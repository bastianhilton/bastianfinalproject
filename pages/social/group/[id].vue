<template>
    <div class="contentPage">
        <!--<profilebar />-->

        <v-card min-height="500px" elevation="0">
            <v-toolbar color="primary" dark extended flat height="250" :image="`${$directus.url}assets/${space?.image?.filename_disk}?width=600`"></v-toolbar>
            <!--Shorts for Space 
            <shorts />-->
            <v-tabs v-model="tab" align-tabs="center" bg-color="info" stacked>
                <v-tab value="tab-1">
                    <v-btn variant="text" stacked prepend-icon="fas fa-home">About</v-btn>
                </v-tab>

                <v-tab value="tab-2">
                    <v-btn variant="text" stacked prepend-icon="fas fa-message">Posts</v-btn>
                </v-tab>

                <v-tab value="tab-3">
                    <v-btn variant="text" stacked prepend-icon="fas fa-users">Members</v-btn>
                </v-tab>

                <v-tab value="tab-4">
                    <v-btn variant="text" stacked prepend-icon="fas fa-shop">Products</v-btn>
                </v-tab>

                <v-tab value="tab-5">
                    <v-btn variant="text" stacked prepend-icon="fas fa-photo-film">Media</v-btn>
                </v-tab>

                <v-tab value="tab-6">
                    <v-btn variant="text" stacked prepend-icon="fas fa-calendar-days">Events</v-btn>
                </v-tab>

                <v-tab value="tab-7">
                    <v-btn variant="text" stacked prepend-icon="fas fa-gear">Settings</v-btn>
                </v-tab>

                <v-tab value="tab-8" align-tabs="end">
                    <v-btn variant="text" stacked prepend-icon="fas fa-right-from-bracket">Leave Space</v-btn>
                </v-tab>
            </v-tabs>

            <v-card-text style="padding: 0rem !important;">
                <v-tabs-window v-model="tab">
                    <v-window v-model="tab">
                        <!--About Space-->
                        <v-tabs-window-item value="tab-1">
                            <section data-bs-version="5.1" class="features1 cid-sBXVhMMeXw" id="features2-2k">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-6 col-lg-3">
                                            <div class="card-wrapper">
                                                <div class="card-box align-center">
                                                    <h4
                                                        class="card-title align-center mbr-black mbr-fonts-style display-7">
                                                        <strong>
                                                            <v-avatar size="80" rounded="0" :image="`${$directus.url}assets/${space?.image?.filename_disk}?width=600`"></v-avatar>
                                                        </strong><br><br>{{ space?.name }}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-3">
                                            <div class="card-wrapper">
                                                <div class="card-box align-center">
                                                    <span class="mbr-iconfont mobi-mbri-calendar mobi-mbri"
                                                        style="color: rgb(255, 153, 102); fill: rgb(255, 153, 102);"></span>
                                                    <h4
                                                        class="card-title align-center mbr-black mbr-fonts-style display-7">
                                                        <strong>Group Created</strong><br><br>{{ new Date(space?.date_created).toLocaleDateString() }}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-3">
                                            <div class="card-wrapper">
                                                <div class="card-box align-center">
                                                    <span class="mbr-iconfont mobi-mbri-users mobi-mbri"
                                                        style="color: rgb(255, 153, 102); fill: rgb(255, 153, 102);"></span>
                                                    <h4
                                                        class="card-title align-center mbr-black mbr-fonts-style display-7">
                                                        <strong># of
                                                            Members</strong><br><br>{{ space?.numberOfMembers }}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-3">
                                            <div class="card-wrapper">
                                                <div class="card-box align-center">
                                                    <v-avatar size="50">
                                                        <img :src="`${space?.creator_avatar?.filename_disk}`" :alt="space?.creator" />
                                                    </v-avatar>
                                                    <h4
                                                        class="card-title align-center mbr-black mbr-fonts-style display-7">
                                                        <strong>Created By</strong><br><br><a
                                                            :href="`/account/user/${space?.creator}`"></a></h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="card-wrapper">
                                                <div class="card-box align-center">
                                                    <h4 class="card-title align-center mbr-black mbr-fonts-style display-7"
                                                        v-html="space?.description"></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </v-tabs-window-item>

                        <!--Space Social Feed-->
                        <v-tabs-window-item value="tab-2">
                            <v-row>
                            <v-col cols="3" v-for="(posts, index) in space?.posts?.posts_id" :key="index">
                                <post :post="posts" />
                            </v-col>
                        </v-row>
                        </v-tabs-window-item>

                        <!--Space People-->
                        <v-tabs-window-item value="tab-3">
                            <v-list lines="one">
                                <v-list-item :title="`${space?.numberOfMembers} Members`"></v-list-item>
                            </v-list>

                            <v-text-field label="Find a Member" prepend-inner-icon="fas fa-search" variant="solo">
                            </v-text-field>

                            <v-list lines="two">
                                <h5>Creator of {{ space?.name }}</h5>
                                <v-list-item v-for="admins in space?.space_admins?.space_admin_id" :key="admins">
                                    <creators />
                                </v-list-item>
                            </v-list>

                            <v-list lines="two">
                                <h5>Admins of {{ space?.name }}</h5>
                                <v-list-item v-for="admins in space?.space_admins?.space_admin_id" :key="admins">
                                    <creators />
                                </v-list-item>
                            </v-list>

                            <v-list lines="two">
                                <h5>Moderators of {{ space?.name }}</h5>
                                <v-list-item v-for="admins in space?.space_admins?.space_admin_id" :key="admins">
                                    <creators />
                                </v-list-item>
                            </v-list>

                            <v-list lines="two">
                                <h5>All Members of {{ space?.name }}</h5>
                                <v-list-item v-for="admins in space?.space_admins?.space_admin_id" :key="admins">
                                    <creators />
                                </v-list-item>
                            </v-list>
                        </v-tabs-window-item>

                        <!--Space Media-->
                        <v-tabs-window-item value="tab-4">
                            <v-card class="mx-auto" max-width="400">
                                <img class="align-end text-white" height="200" :src="`${space?.media?.filename_disk}`"
                                    :alt="space?.name" cover />
                            </v-card>
                        </v-tabs-window-item>

                        <!--Space Products-->
                        <v-tabs-window-item value="tab-5">
                            <section class="features3 cid-sBXVblMrWB" id="features3-2j">
                                <div class="container" v-for="products in space?.products?.products_id"
                                    :key="products?.id">
                                    <productCard :product="products" />
                                </div>
                            </section>
                        </v-tabs-window-item>

                        <!--Space Events-->
                        <v-tabs-window-item value="tab-6">
                            <section class="features3 cid-sBXVblMrWB" id="features3-2j">
                                <div class="container" v-for="products in space?.products?.products_id"
                                    :key="products?.id">
                                    <relatedevents :product="products" />
                                </div>
                            </section>
                        </v-tabs-window-item>

                        <!--Settings-->
                        <v-tabs-window-item value="tab-7">
                            <settings :id="groupId" />
                        </v-tabs-window-item>
                    </v-window>
                </v-tabs-window>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                //url: process.env.DIRECTUS_URL,
                groupId: this.$route.params.id
            }
        },
    }
</script>

<script setup>
    import profilebar from '~/components/menus/profilebar.vue'
    import comments from '~/components/cms/social/comments.vue'
    import settings from '~/components/cms/update/social/updatespace.vue'
    import productCard from '~/components/commerce/commerce/product/productCard.vue'
    import shorts from '~/components/cms/related/shorts.vue'
    import post from '~/components/cms/related/posts.vue'
    import relatedevents from '~/components/commerce/related/relatedevents.vue'

    //import group from '~/composables/graphql/cms/queries/id/group'
    import {
        ref
    } from 'vue'

    const model = ref(null);
    const tab = ref(null);
    const route = useRoute();
    /*    const { data } = useAsyncQuery(group, {
           id: route.params.id
       });*/

const { $directus, $readItem } = useNuxtApp()

const { data: space } = await useAsyncData('space', () => {
  return $directus.request(
    $readItem('spaces', route.params.id, {
      fields: ['*', { '*': ['*'] }]
    })
  )
})


    useHead({
        title: 'space?.name'
    })

    definePageMeta({
        //middleware: ['auth'],
    }) /**/
</script>