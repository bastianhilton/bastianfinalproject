<template>
    <div>
        <v-card class="mx-auto" max-width="400" style="max-height: 650px !important;">
            <img class="align-end text-white" style="max-height: 550px !important;" src="~/../assets/images/mystery-group-50.png" cover />
                <v-card-title>{{ space?.name }}</v-card-title>

            <v-card-subtitle class="pt-4">
                <div># of Members: {{space?.totalMemberCount}}</div>

                <div>Created: {{ new Date(space?.dateCreated).toLocaleDateString() }}</div>

                <div>Last Activity: {{ new Date(space?.lastActivity).toLocaleDateString() }}</div>
            </v-card-subtitle>

            <v-card-text>
                <div>Status: {{space?.status}}</div>

                <div v-html="space?.description"></div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange" text="Join" :href="`/social/group/${space?.id}`"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue'

    const model = ref(null)
    const props = defineProps({
        space: {
            type: Object,
            required: true,
        },
    });
    const {
        space
    } = props;
</script>