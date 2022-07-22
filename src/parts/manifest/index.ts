import { joinURL } from 'ufo'
import { useNuxt, addServerHandler } from '@nuxt/kit'
import type { PWAContext } from '../../types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  const nuxt = useNuxt()

  nuxt.options.runtimeConfig.pwaManifest = pwa.manifest

  addServerHandler({
    route: '/manifest.json',
    handler: pwa._resolver.resolve('./runtime/server/manifest')
  })

  pwa._manifestMeta = {
    rel: 'manifest',
    href: joinURL(nuxt.options.app.baseURL, 'manifest.json')
  }
}
