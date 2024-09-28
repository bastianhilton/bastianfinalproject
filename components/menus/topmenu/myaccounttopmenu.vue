<template>
  <div>
    <v-menu :location="location" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <a variant="flat" v-bind="props">
          <v-icon start icon="fas fa-user-circle"></v-icon>
        </a>
      </template>
      <v-list>
        <v-row class="accountDropdown">
          <v-col cols="6" v-for="(menu, index) in result?.menus?.nodes" :key="index">
            <h6>{{ menu?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in menu?.menuItems?.nodes" :key="index">
              <v-list-item :title="item?.label" :value="item?.label" :prepend-icon="item?.icon"
                :href="item?.path"></v-list-item>
            </div>
          </v-col>

          <v-col cols="6" v-for="(menu, index) in social?.menus?.nodes" :key="index">
            <h6>{{ menu?.name }}</h6>
            <br>
            <v-divider></v-divider>
            <div v-for="(item, index) in menu?.menuItems?.nodes" :key="index">
              <v-list-item :title="item?.label" :value="item?.label" :prepend-icon="item?.websiteFields?.icon"
                :href="item?.path"></v-list-item>
            </div>
          </v-col>
          <v-col cols="12">
            <v-list-item prepend-icon="fas fa-upload" title="Upload Center" href="/upload"></v-list-item>
          </v-col>

          <v-col cols="12">
            <v-list-item prepend-icon="fas fa-clock-rotate-left" :href="`/sign-${ user ? 'out' : 'in' }`"> Sign {{ user ? 'out' : 'in' }}</v-list-item><!--
            <logout />-->
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logout from '~/components/authentication/logout.vue'
import { useQuery } from '@vue/apollo-composable'
import { AccountCommerce, AccountSocial } from '~/graphql/cms/queries/menus/myaccounttopmenu'

const { result } = useQuery(AccountCommerce, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})
const { result: social } = useQuery(AccountSocial, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})

const location = ref('bottom');
</script>
