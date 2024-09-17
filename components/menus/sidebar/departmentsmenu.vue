<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="Departments" expand-icon="fas fa-plus" collapse-icon="fas fa-minus" elevation="0">
        <v-expansion-panel-text>
          <div v-for="child in result?.categories?.items" :key="child.uid">
            <v-list v-for="child in child?.children" :key="child.uid" class="ml-4">
              <v-list-item :title="child.name" :value="child.name" :href="`/departments/${child.uid}`">
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
    ref,
    onMounted
  } from 'vue';
  import {
    useQuery
  } from '@vue/apollo-composable'
  import categories from '~/graphql/commerce/queries/categories.js'

  const {
    result
  } = useQuery(categories)

  /*  import {
      getCategories
    } from '@/composables/commerce/categories/getCategories';

    const categories = ref([]);

    onMounted(async () => {
      // Fetch the category with ID 2, which is the root category with children
      categories.value = await getCategories('Default Category', 2);
      console.log(categories.value); // Check the response structure for troubleshooting
    }); */
</script>