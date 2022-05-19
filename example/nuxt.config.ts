import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/'
  },
  buildModules: [
    '@unocss/nuxt',
    '../src/module'
  ],
  unocss: {
    preflight: true,
    icons: true
  }
})
