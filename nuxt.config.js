/*import {
  defineNuxtConfig
} from 'nuxt' */
import vuetify, {
  transformAssetUrls
} from 'vite-plugin-vuetify'
require("dotenv").config()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [{
        name: 'description',
        content: 'Social Marketplace for Creators'
      }, ],
      link: [{
          rel: 'icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-touch-icon-180x180.png'
        },
      ],
      script: [{
          src: '//platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons&source=platform',
        },
         {
           src: 'https://www.paypal.com/sdk/js?client-id=AVd8oZZ4CzkBDwsDNc5-KO21w2-ebavRSw0NZme7laFfoa-mUY_DyscyNkVRJJMH_9fmca43WlytIta3&buyer-country=US&currency=USD&components=buttons,card-fields&enable-funding=venmo',
           async: true
         },
      ],
    },
  },

  appConfig: {
    titleSuffix: 'Meeovi',
  },

  css: [
    'assets/web/assets/mobirise-icons2/mobirise2.css',
    'assets/web/assets/mobirise-icons/mobirise-icons.css',
    'assets/bootstrap/css/bootstrap.min.css',
    'assets/tether/tether.min.css',
    'assets/bootstrap/css/bootstrap-grid.min.css',
    'assets/bootstrap/css/bootstrap-reboot.min.css',
    'assets/parallax/jarallax.css',
    'assets/theme/css/style.css',
    'assets/gallery/style.css',
    'assets/mobirise/css/mbr-additional.css',
    'assets/css/base.css',
    'assets/css/button.css',
    'assets/css/input.css',
    'assets/css/search.css',
    'assets/css/shadow.css',
    'assets/css/spacing.css',
    'assets/css/typography.css',
    'assets/css/utilities.css',
    'assets/css/components/home.css',
    'assets/css/components/rating-filter.css',
    'assets/css/components/results-grid.css',
    'vuetify/lib/styles/main.sass',
    //'@mdi/font/css/materialdesignicons.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'assets/styles/mobile.css',
    'assets/styles/styles.css',
    'assets/styles/App.css',
    'assets/styles/App.mobile.css',
    'assets/styles/Theme.css',
    'assets/styles/sellerDashboard.css',
    'assets/styles/PriceSlider.css',
    'assets/styles/searchTheme.css',
    'vuetify/styles',
  ],

  modules: [
    "@nuxt/image",
    '@nuxtjs/tailwindcss',
    "nuxt-disqus",
    '@pinia/nuxt',
    "@storefront-ui/nuxt",
    //"@prisma/nuxt",
    '@nuxtjs/seo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true
        }))
      })
    },
  ],

  // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/prisma-nuxt-module#configuration
 /* prisma: {
    installCli: false,
    installClient: false,
    generateClient: false,
    formatSchema: false,
    installStudio: false,
    autoSetupPrisma: true
  },*/

  // https://nuxtseo.com/robots
  robots: {
    groups: [{
      userAgent: ['*'],
      disallow: ['/account'],
      allow: ['/pages/*'],
      comments: 'Allow Google AdsBot to index the login page but no-admin pages'
    }, ]
  },

  disqus: {
    shortname: process.env.DISQUS_SHORTNAME,
  },

  /*auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    globalAppMiddleware: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: `http://localhost:3011/api/auth`,
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'credentials',
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },*/

  runtimeConfig: {
    // Elasticsearch
    searchHost: process.env.ELASTICSEARCH_URL,
    searchKey: process.env.ELASTICSEARCH_APP_SEARCH_KEY,
    indexName: process.env.ELASTICSEARCH_INDEX_NAME,
    api_key: process.env.ELASTICSEARCH_API_KEY,
    id: process.env.ELASTICSEARCH_ID,

    // Cloudflare Turnstile
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
    public: {
      // Hasura
      websiteURL: process.env.GRAPHQL_HOST,
      websiteToken: process.env.GRAPHQL_TOKEN,

      //websiteURL: process.env.GQL_HOST,
      //websiteToken: process.env.WEBSITE_TOKEN,

      // Authentication Secret
      authSecret: process.env.NUXT_AUTH_SECRET,

      // JWT Secret
      jwtSecret: process.env.JWT_SECRET,

      // Wordpress
      wordpressUrl: process.env.API_URL,
      wpGraphql: process.env.API_URL_GRAPHQL,
      wordpressToken: process.env.WORDPRESS_TOKEN,
      wpApiUsername: process.env.WP_API_USERNAME,
      wpApiPassword: process.env.WP_API_PASSWORD,

      // Magento 
      commerceUrl: process.env.MAGE_STORE_URL,
      commerceGraphql: process.env.MAGE_MAGENTO_GRAPHQL_URL,
      commerceApiToken: process.env.WEBSITE_TOKEN,

      // Directus
     /* directus: {
        url: process.env.DIRECTUS_URL,
        auth: {
          email: process.env.NUXTUS_DIRECTUS_ADMIN_EMAIL,
          password: process.env.NUXTUS_DIRECTUS_ADMIN_PASSWORD,
          token: process.env.NUXTUS_DIRECTUS_STATIC_TOKEN,
        }
      },*/

      // Budibase
      budibaseEmbed: process.env.BUDIBASE_EMBED || '',

      // Google Tag Manager
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID,

      // Stripe
      stripePk: process.env.STRIPE_PUBLIC_KEY,
    },
    // Stripe
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXX', // Replace with your secret key
  },

  build: {
    transpile: [
      'vuetify',
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/pro-solid-svg-icons",
      "@fortawesome/pro-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [
      {
        name: 'graphql-loader',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.gql')) {
            return {
              code: `import gql from 'graphql-tag'; export default gql\`${code}\`;`,
              map: null
            }
          }
        }
      }
    ]
  },

  compatibilityDate: '2024-07-14'
})