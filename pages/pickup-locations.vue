<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="Meeovi" width="400">
          <template v-slot:title>
            <span class="font-weight-black">Meeovi</span>
          </template>

          <v-card-text class="bg-surface-light pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
            voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum
            unde voluptatem!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">

      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  useHead({
    title: 'Pickup Locations',
  })
</script>