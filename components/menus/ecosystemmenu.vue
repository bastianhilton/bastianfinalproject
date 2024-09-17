<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" title="Explore The Meeovi Company">
                    <v-icon start icon="fas fa-bars-staggered"></v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon icon="fas fa-circle-xmark"></v-icon>
                    </v-btn>
                    <v-card-title>
                        <span class="text-h6">The Meeovi Company</span>
                    </v-card-title>
                </v-toolbar>
                <v-row style="padding: 10px;" v-for="menu in result?.menus?.nodes" :key="menu?.id">
                    <v-col cols="3" v-for="menu in menu?.menuItems?.nodes" :key="menu?.id">
                        <a :href="menu?.path">
                            <v-card class="mx-auto" max-width="300">
                              <v-avatar :icon="`fas fa-${menu?.icon}`" size="180"></v-avatar>
                                <v-card-title>{{ menu?.label }}</v-card-title>
                            </v-card>
                        </a>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import ecosystemmenu from '~/graphql/cms/queries/menus/ecosystemmenu'

const { result } = useQuery(ecosystemmenu, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})

const dialog = ref(false);
</script>