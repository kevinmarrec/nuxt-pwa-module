import { addTemplate, useNuxt } from '@nuxt/kit'
import _consola from 'consola'
import { join } from 'pathe'
import { randomString } from '../../utils'
import type { PWAContext } from '../../types'
import type { WorkboxOptions } from './types'

const consola = _consola.create({ level: process.env.NUXT_PWA_SILENT === '1' ? Number.NEGATIVE_INFINITY : undefined })

function addNitroPlugin (nuxt: ReturnType<typeof useNuxt>, plugin: string) {
  nuxt.hook('nitro:config', (config) => {
    config.externals = config.externals || {}
    config.externals.inline = config.externals.inline || []
    config.externals.inline.push(plugin)
    config.plugins = config.plugins || []
    config.plugins.push(plugin)
  })
}

export default async (pwa: PWAContext) => {
  const nuxt = useNuxt()

  if (!pwa.workbox || !pwa.workbox.enabled) {
    // Unregister Service Worker
    return addNitroPlugin(nuxt, pwa._resolver.resolve('./runtime/nitro/unregister-plugin'))
  }

  const options = pwa.workbox

  // Warning when in development mode
  if (nuxt.options.dev)
    consola.warn('[PWA] Workbox is running in development mode')

  // Use Workbox CDN by default
  if (!options.workboxUrl)
    options.workboxUrl = `https://storage.googleapis.com/workbox-cdn/releases/${options.workboxVersion}/workbox-sw.js`

  if (!options.cacheOptions.revision)
    options.cacheOptions.revision = randomString(12)

  const normalizePreCaching = (arr: WorkboxOptions['preCaching']) => arr.map(url => ({
    revision: options.cacheOptions.revision!,
    url: typeof url === 'string' ? url : url.url,
  }))

  options.preCaching = normalizePreCaching(options.preCaching)

  // Define Service Worker
  addTemplate({
    src: options.templatePath ? await pwa._resolver.resolvePath(options.templatePath) : pwa._resolver.resolve('../templates/workbox/sw.js'),
    dst: join(pwa._buildDir, 'sw.js'),
    write: true,
    options,
  })

  // Register Service Worker
  if (options.autoRegister)
    addNitroPlugin(nuxt, pwa._resolver.resolve('./runtime/nitro/register-plugin'))
}
