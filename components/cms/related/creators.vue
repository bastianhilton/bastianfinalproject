<template>
    <div>
        <v-card :class="['ma-4', selectedClass]" @click="toggle" max-width="300"
            :href="`/account/${customers?.id}`">
            <img class="align-end text-white" style="height: 250px;" src="~/assets/images/face6.jpg"
                :alt="customers?.username" cover />

            <v-card-title>@{{ customers?.username }}</v-card-title>

            <v-card-subtitle class="pt-4">
                <span class="fas fa-globe">{{ customers?.locale }}</span>
            </v-card-subtitle>

            <v-card-text>
                <div># of Friends: {{ customers?.totalFriendCount }}</div>

                <div>Member Type: {{ customers?.memberTypes }}</div>

                Last Update: <div v-html="customers?.latestUpdate"></div>
            </v-card-text>

            <v-card-actions>
                <followButton />
            </v-card-actions>
        </v-card>
        <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
                <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
            </v-scale-transition>
        </div>
    </div>
</template>

<script>
    import followButton from '../social/followButton.vue'

    export default {
        components: {
            followButton
        },
        data: () => ({
            model: null,
        }),
    }
</script>

<script setup>
    const props = defineProps({
        customers: {
            type: Object,
            required: true,
        },
    });
    const {
        customers
    } = props;
</script>