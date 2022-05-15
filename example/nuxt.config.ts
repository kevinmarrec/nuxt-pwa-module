import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: [
    '@unocss/nuxt',
    '../src/module'
  ],
  unocss: {
    preflight: true,
    icons: true
  }
})
