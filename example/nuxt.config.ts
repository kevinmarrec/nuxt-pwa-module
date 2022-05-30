import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/'
  },
  modules: [
    '@unocss/nuxt',
    '../src/module'
  ],
  unocss: {
    preflight: true,
    icons: true
  }
})
