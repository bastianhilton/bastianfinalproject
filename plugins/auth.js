
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        nuxtApp.$fetch.options.headers = {
          ...nuxtApp.$fetch.options.headers,
          Authorization: `Bearer ${process.env.WEBSITE_TOKEN}`
        }
      }
    })
  })
  