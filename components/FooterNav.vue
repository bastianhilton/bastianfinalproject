<template>
  <div>
    <Newsletter />
    <v-btn class="footertotopbtn" title="To the Top of the Page" prepend-icon="fas fa-arrow-up" rounded="0"
      href="#mainSection">Back to Top</v-btn>
    <section data-bs-version="5.1" class="footer3 cid-u4cbW5p2qg" once="footer" id="footer03-8b"
      data-sortbtn="btn-primary">
      <div class="container">
        <v-row class="align-left justify-content-center mbr-white">
          <v-col cols="4" class="md-pb" v-for="(menu, index) in about?.menus?.nodes" :key="index">
            <h2 class="mbr-section-title pb-2 mbr-fonts-style display-7">
              <strong>{{ menu?.name }}</strong></h2>
            <div v-for="(menu, index) in menu?.menuItems?.nodes" :key="index">
              <h3 class="mbr-section-subtitle mbr-fonts-style mbr-white display-4"><a
                  :href="`/${menu?.path}`">{{ menu?.label }}</a></h3>
            </div>
          </v-col>
          <v-col cols="4" class="md-pb" v-for="(menu, index) in legal?.menus?.nodes" :key="index">
            <h2 class="mbr-section-title pb-2 mbr-fonts-style display-7">
              <strong>{{ menu?.name }}</strong></h2>
            <div v-for="(menu, index) in menu?.menuItems?.nodes" :key="index">
              <h3 class="mbr-section-subtitle mbr-fonts-style mbr-white display-4"><a
                  :href="`/${menu?.path}`">{{ menu?.label }}</a></h3>
            </div>
          </v-col>
          <v-col cols="4" class="md-pb" v-for="(menu, index) in social?.menus?.nodes" :key="index">
            <h2 class="mbr-section-title pb-2 mbr-fonts-style display-7">
              <strong>{{ menu?.name }}</strong></h2>
            <div v-for="(menu, index) in menu?.menuItems?.nodes" :key="index">
              <h3 class="mbr-section-subtitle mbr-fonts-style mbr-white display-4"><a
                  :href="`/${menu?.path}`">{{ menu?.label }}</a></h3>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section data-bs-version="5.1" class="footer7 cid-u4ccfXoeP6" once="footers" id="footer7-8c"
      data-sortbtn="btn-primary">
      <div class="container">
        <div class="row align-left justify-content-center mbr-white" v-for="(menu, index) in copyright?.menus?.nodes" :key="index">
          <v-col cols="3" v-for="(menu, index) in menu?.menuItems?.nodes" :key="index">
            <v-list-item :title="menu?.label" :value="menu?.label" :prepend-icon="menu?.icon"
              :href="`/${menu?.path}`"></v-list-item>
          </v-col>
          <v-col cols="12">
            <p class="mbr-text mb-0 mbr-fonts-style display-7" style="width: 100%; text-align: center;">
              @ 2017 - {{ new Date().getFullYear() }}&nbsp;<a href="/">Meeovi&nbsp;&nbsp;</a>All
              Rights Reserved.
            </p>
          </v-col>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { aboutQuery, legalQuery, copyrightQuery } from '~/graphql/cms/queries/menus/footer'
import socialmenu from '~/graphql/cms/queries/menus/socialmenu'

const { result: about } = useQuery(aboutQuery, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})
const { result: legal } = useQuery(legalQuery, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})

const { result: social } = useQuery(socialmenu, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})

const { result: copyright } = useQuery(copyrightQuery, null, {
  context: {
    clientName: 'secondary' // This will use the secondary endpoint
  }
})
</script>