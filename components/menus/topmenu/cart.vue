<template>
    <div>
        <v-btn class="shopping-cart" icon="fas fa-shopping-cart" title="Shopping Cart" variant="text" size="small">
            <v-icon start icon="fas fa-shopping-cart"></v-icon>
            <v-menu activator="parent" style="top: 50px !important; position: relative;">
                <v-list>
                    <checkout />
                </v-list>
            </v-menu>
        </v-btn>
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue'
    import checkout from '~/components/commerce/partials/checkout.vue'

    const drawer = ref(false);
    const group = ref(null);
</script>