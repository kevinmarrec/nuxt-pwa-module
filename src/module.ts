import { join } from 'pathe'
import { createResolver, defineNuxtModule } from '@nuxt/kit'
import icon from './icon'
import manifest from './manifest'
import meta from './meta'
import workbox from './workbox'
import type { PWAOptions, PWAContext } from './types'

export default defineNuxtModule<PWAOptions>({
  meta: {
    name: 'pwa'
  },
  defaults: nuxt => ({
    icon: {
      source: null,
      sizes: [],
      fileName: 'icon.png',
      targetDir: 'icons'
    },
    manifest: {
      name: process.env.npm_package_name!,
      short_name: process.env.npm_package_name!,
      description: process.env.npm_package_description!,
      lang: 'en',
      start_url: nuxt.options.app.baseURL + '?standalone=true',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: []
    },
    meta: {
      name: process.env.npm_package_name!,
      author: process.env.npm_package_author_name!,
      description: process.env.npm_package_description!,
      favicon: true,
      mobileApp: true,
      mobileAppIOS: false,
      appleStatusBarStyle: false,
      theme_color: undefined,
      lang: 'en',
      ogType: 'website',
      ogSiteName: true,
      ogTitle: true,
      ogDescription: true,
      ogImage: true,
      ogHost: undefined,
      ogUrl: true,
      twitterCard: undefined,
      twitterSite: undefined,
      twitterCreator: undefined
    },
    workbox: {
      enabled: !nuxt.options.dev,
      workboxVersion: '6.5.3',
      workboxUrl: null
      // TODO: More Workbox options
    }
  }),
  setup (options, nuxt) {
    const pwa: PWAContext = {
      ...options,
      _assetsDir: join(nuxt.options.buildDir, 'pwa'),
      _resolver: createResolver(import.meta.url)
    }

    icon(pwa)
    manifest(pwa)
    meta(pwa)
    workbox(pwa)

    // Nitro will serve PWA assets
    const { nitro } = nuxt.options
    nitro.publicAssets = nitro.publicAssets || []
    nitro.publicAssets.push({
      baseURL: nuxt.options.app.buildAssetsDir,
      dir: pwa._assetsDir
    })
  }
})
