export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/',
  },
  css: ['@unocss/reset/normalize.css'],
  modules: ['@unocss/nuxt', '../src/module'],
  pwa: {
    meta: {
      // Generate splash screens for iOS
      mobileAppIOS: true,
    },
    workbox: {
      enabled: true,
    },
  },
})
