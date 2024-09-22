<template>
    <div class="contentPage">
      <!--<profilebar />-->
        <v-toolbar title="My Network" color="transparent"></v-toolbar>
        <v-row style="padding-top: 10px; padding-bottom: 10px;">
            <v-col cols="3" v-for="(customers, index) in result?.members?.nodes" :key="index">
                <v-card class="mx-auto" max-width="300">
                    <img class="align-end text-white" height="200" :src="`${customers?.avatar?.url}`" :alt="customers?.username" cover />

                    <v-card-title>@{{ customers?.username }}</v-card-title>

                    <v-card-subtitle class="pt-4">
                        <span class="fas fa-globe">{{ customers?.locale }}</span> 
                    </v-card-subtitle>

                    <v-card-text>
                        <div># of Friends: {{ customers?.totalFriendCount }}</div>

                        <div>Member Type: {{ customers?.memberTypes }}</div>

                        <div>Last Update: {{ customers?.latestUpdate }}</div>
                    </v-card-text>

                    <v-card-actions>
                      <followButton />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
  import {
    useQuery
  } from '@vue/apollo-composable'
import profilebar from '~/components/menus/profilebar.vue'
import followButton from '~/components/cms/social/followButton.vue'
import {members} from '~/graphql/cms/queries/members'
import { ref } from 'vue'

const {
    result
  } = useQuery(members, null, {
    context: {
      clientName: 'secondary' // This will use the secondary endpoint
    }
  })

const model = ref(null);

/*import { createDirectus, rest, readItems, readItem } from '@directus/sdk';
const route = useRoute()

const client = createDirectus(process.env.DIRECTUS_URL).with(rest());

const members = await client.request(readItems('customers', route.params.id, {
  fields: ['*'],
  filter: {
    type: {
        _eq: "Seller"
    }
  }
}));

const page = await client.request(readItem('pages', route.params.id, {
  fields: ['*'],
  filter: {
    id: {
      _eq: 30,
    }
  }
}));*/

useHead({
    title: 'My Network'
})
</script>