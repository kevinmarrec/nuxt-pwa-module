import { addTemplate, useNuxt } from '@nuxt/kit'
import consola from 'consola'
import { join } from 'pathe'
import type { PWAContext } from '../../types'

export default async (pwa: PWAContext) => {
  if (!pwa.workbox || !pwa.workbox.enabled)
    return

  const options = pwa.workbox
  const nuxt = useNuxt()

  // Warning when in development mode
  if (nuxt.options.dev)
    consola.warn('[PWA] Workbox is running in development mode')

  // Use Workbox CDN by default
  if (!options.workboxUrl)
    options.workboxUrl = `https://storage.googleapis.com/workbox-cdn/releases/${options.workboxVersion}/workbox-sw.js`

  // Define Service Worker
  addTemplate({
    src: options.templatePath ? await pwa._resolver.resolvePath(options.templatePath) : pwa._resolver.resolve('../templates/workbox/sw.js'),
    dst: join(pwa._buildDir, 'sw.js'),
    write: true,
    options,
  })

  // Register Service Worker
  if (options.autoRegister) {
    nuxt.hook('nitro:config', (config) => {
      const plugin = pwa._resolver.resolve('./runtime/nitro-plugin')
      config.externals = config.externals || {}
      config.externals.inline = config.externals.inline || []
      config.externals.inline.push(plugin)
      config.plugins = config.plugins || []
      config.plugins.push(plugin)
    })
  }
}
