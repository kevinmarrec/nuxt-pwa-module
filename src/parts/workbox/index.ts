import { addTemplate, useNuxt } from '@nuxt/kit'
import consola from 'consola'
import { join } from 'pathe'
import { joinURL } from 'ufo'
import type { PWAContext } from '../../types'

export default (pwa: PWAContext) => {
  if (!pwa.workbox || !pwa.workbox.enabled) { return }

  const options = pwa.workbox
  const nuxt = useNuxt()
  const head = nuxt.options.app.head as Required<typeof nuxt.options.app.head>

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
    dst: join(pwa._buildDir, 'sw.js'),
    write: true,
    options
  })

  // Embed script that registers the Service Worker
  head.script.push({
    children: [
      "if ('serviceWorker' in navigator) {",
      `  window.addEventListener('load', () => navigator.serviceWorker.register('${joinURL(nuxt.options.app.baseURL, 'sw.js')}'))`,
      '}'
    ].join('\n')
  })
}
