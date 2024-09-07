<template>
  <div>
    <v-sheet class="mx-auto sliderProducts row align-items-stretch items-row justify-content-center">
      <h4>Related Spaces</h4>
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
        <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }" v-for="(spaces, index) in spaces" :key="index">
          <space :space="spaces" />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import space from '~/components/cms/related/spaces.vue'

  const model = ref(null)
  const {
        $directus,
        $readItems,
    } = useNuxtApp()

    const {
        data: spaces
    } = await useAsyncData('spaces', () => {
        return $directus.request($readItems('spaces'))
    })
</script>