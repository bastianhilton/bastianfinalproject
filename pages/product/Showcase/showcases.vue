<template>
  <div class="contentPage">
    <!--<profilebar />-->
    <v-toolbar title="Showcases" color="purple">
      <v-dialog min-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" prepend-icon="fas fa-plus" title="Create Showcase" variant="flat">Create Showcase
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <createshowcase />
        </template>
      </v-dialog>
    </v-toolbar>

    <v-row style="padding-top: 10px;">
      <v-col cols="4" v-for="showcase in data?.products?.items" :key="showcases">
        <a :href="`/product/showcase/${showcase?.uid}`">
          <v-card class="mx-auto" max-width="500" :title="showcase?.name">
            <v-list lines="one">
              <img :src="`${showcase?.image?.url}`" :alt="showcase?.name"
                class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover />
              <v-list-item :prepend-avatar="`${showcase?.author?.node?.avatar?.url}`"
                :title="showcase?.author?.node?.username"></v-list-item>
            </v-list>
            <v-card-subtitle class="text-white">Price: {{ showcase?.dyanmic_price }}</v-card-subtitle>
            <v-card-subtitle class="text-white" v-html="showcase?.description?.html"></v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange">Add to Cart</v-btn>
              <v-spacer></v-spacer>

              <bookmark />
            </v-card-actions>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import profilebar from '../../../components/menus/profilebar.vue'
  import createshowcase from '../../../components/cms/create/social/createshowcase.vue'
  import bookmark from '../../../components/social/bookmark.vue'
  import showcases from '../../../queries/commerce/queries/showcases'

  const {
    data
  } = useAsyncQuery(showcases);

  /*const { getItems } = useDirectusItems()

      const showcases = await getItems({
        collection: "showcases"
      });*/

  useHead({
    title: 'Showcases',
  })
</script>