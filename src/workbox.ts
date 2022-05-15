import { join } from 'pathe'
import { addPlugin, addTemplate, createResolver, useNuxt } from '@nuxt/kit'
import type { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.workbox || !pwa.workbox.enabled) { return }

  const options = pwa.workbox
  const nuxt = useNuxt()

  // Warning when in develpoment mode
  if (nuxt.options.dev) {
    // eslint-disable-next-line no-console
    console.warn('Workbox is running in development mode')
  }

  const { resolve } = createResolver(import.meta.url)

  if (!options.workboxUrl) {
    options.workboxUrl = `https://storage.googleapis.com/workbox-cdn/releases/${options.workboxVersion}/workbox-sw.js`
  }

  // Service Worker
  addTemplate({
    src: resolve('../templates/workbox/sw.js'),
    dst: join(pwa._buildDir, 'sw.js'),
    write: true,
    options
  })

  // Plugin that registers the Service Worker
  addPlugin({
    src: resolve('./runtime/workbox/plugin'),
    mode: 'client'
  })
}
