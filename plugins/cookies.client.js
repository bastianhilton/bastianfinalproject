import { defineNuxtPlugin } from '#app'
import CookieUniversal from 'cookie-universal-nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  // Create a new cookie instance
  const cookies = CookieUniversal()

  // Provide $cookies globally
  nuxtApp.provide('cookies', cookies)
})
