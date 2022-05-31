import { join } from 'pathe'
import { addPlugin, addTemplate, useNuxt } from '@nuxt/kit'
import consola from 'consola'
import type { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.workbox || !pwa.workbox.enabled) { return }

  const options = pwa.workbox
  const nuxt = useNuxt()

  // Warning when in development mode
  if (nuxt.options.dev) {
    consola.warn('[PWA] Workbox is running in development mode')
  }

  // Use Workbox CDN by default
  if (!options.workboxUrl) {
    options.workboxUrl = `https://storage.googleapis.com/workbox-cdn/releases/${options.workboxVersion}/workbox-sw.js`
  }

  // Service Worker
  addTemplate({
    src: pwa._resolver.resolve('../templates/workbox/sw.js'),
    dst: join(pwa._rootDir, 'sw.js'),
    write: true,
    options
  })

  // Plugin that registers the Service Worker
  addPlugin({
    src: pwa._resolver.resolve('./runtime/workbox/plugin'),
    mode: 'client'
  })
}
