/*import {
  defineNuxtConfig
} from 'nuxt' */
import vuetify, {
  transformAssetUrls
} from 'vite-plugin-vuetify'

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
        {
          href: "//cdn-images.mailchimp.com/embedcode/classic-061523.css",
        },
      ],
      script: [{
          src: '//platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons&source=platform',
        },
        /* {
           src: 'https://js.stripe.com/v3/',
         }
        {
          src: "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js",
        },*/
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
    'assets/styles/sellerDashboard.css',
    'assets/styles/PriceSlider.css',
    'assets/styles/searchTheme.css',
    'vuetify/styles',
  ],

  modules: [
    '@nuxtjs/apollo',
    'nuxt3-leaflet',
    "@nuxt/image",
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    "nuxt-disqus",
    //'nuxt-directus',
    "@storefront-ui/nuxt",
    "@prisma/nuxt",
    '@nuxtjs/seo',
    '@pinia/nuxt',
    '@nuxtjs/algolia',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true
        }))
      })
    },
  ],

  // https://pinia.vuejs.org/ssr/nuxt.html
  pinia: {
    storesDirs: ['./stores/**'],
  },

  algolia: {
    // options
    apiKey: process.env.ALGOLIA_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    instantSearch: {
      theme: 'algolia'
    },
    useFetch: true,
    crawler: {
      apiKey: process.env.ALGOLIA_CRAWLER_ID,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      meta: ['title', 'description'],
      include: () => true
    },
  },

  // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/prisma-nuxt-module#configuration
  prisma: {
    installCli: false,
    installClient: false,
    generateClient: false,
    formatSchema: false,
    installStudio: false,
    autoSetupPrisma: true
  },

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

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    globalAppMiddleware: false,
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
  },

  runtimeConfig: {
    // Elasticsearch
    searchHost: process.env.ELASTICSEARCH_URL,
    searchKey: process.env.ELASTICSEARCH_APP_SEARCH_KEY,
    indexName: process.env.ELASTICSEARCH_INDEX_NAME,

    // Cloudflare Turnstile
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
    public: {
      // Hasura
      websiteURL: process.env.GQL_HOST,
      websiteToken: process.env.WEBSITE_TOKEN,

      //websiteURL: process.env.GQL_HOST,
      //websiteToken: process.env.WEBSITE_TOKEN,

      // Authentication Secret
      authSecret: process.env.NUXT_AUTH_SECRET,

      // Wordpress
      wordpressUrl: process.env.API_URL,
      wordpressToken: process.env.WORDPRESS_TOKEN,
      wpApiUsername: process.env.WP_API_USERNAME,
      wpApiPassword: process.env.WP_API_PASSWORD,

      // Magento 
      commerceUrl: process.env.MAGE_STORE_URL,
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

      // Mailchimp
      mailchimpId: process.env.MAILCHIMP_ID,

      // Cloudinary
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,

      // Stripe
      stripePk: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_HOST,
        tokenStorage: "cookie",
        httpLinkOptions: {
          headers: {
            'x-hasura-admin-secret': `${process.env.GRAPHQL_TOKEN}`,
            'content-type': 'application/json'
          }
        }
      },
      cms: {
        httpEndpoint: process.env.API_URL_GRAPHQL,
        /*  httpLinkOptions: {
            headers: {
              'Authorization': `Bearer ${process.env.WORDPRESS_TOKEN}`,
              'username': process.env.WP_API_USERNAME,
              'password': process.env.WP_API_PASSWORD,
              'content-type': 'application/json'
            }
          }*/
      },
    },
  },
  /**/

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
  },

  compatibilityDate: '2024-07-14'
})