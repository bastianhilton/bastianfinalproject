<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="My Account" expand-icon="fas fa-plus" collapse-icon="fas fa-minus" elevation="0">
        <v-expansion-panel-text>
          <div v-for="item in result?.menus?.nodes" :key="item">
            <v-list v-for="item in item?.menuItems?.nodes" :key="item">
              <v-list-item :title="item?.label" :value="item?.label" :prepend-icon="item?.icon" :href="item?.path">
              </v-list-item>
            </v-list>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    useQuery
  } from '@vue/apollo-composable'
  import myaccountmenu from '~/graphql/cms/queries/menus/myaccountmenu'

  const {
    result
  } = useQuery(myaccountmenu, null, {
    context: {
      clientName: 'secondary' // This will use the secondary endpoint
    }
  })
</script>