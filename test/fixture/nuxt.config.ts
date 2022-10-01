import PWA from '../../src/module'

export default defineNuxtConfig({
  app: {
    baseURL: '/foo/',
  },
  modules: [PWA],
  pwa: {
    meta: {
      mobileAppIOS: true,
    },
  },
})
