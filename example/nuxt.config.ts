export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/'
  },
  modules: [
    '@unocss/nuxt',
    '../src/module'
  ],
  pwa: {
    meta: {
      // Generate splash screens for iOS
      mobileAppIOS: true
    },
    workbox: {
      enabled: true
    }
  },
  unocss: {
    preflight: true,
    icons: true
  }
})
