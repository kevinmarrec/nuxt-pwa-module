import { joinURL } from 'ufo'
import { useNuxt, addServerHandler } from '@nuxt/kit'
import type { PWAContext } from '../../types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  const nuxt = useNuxt()

  nuxt.options.runtimeConfig.pwaManifest = pwa.manifest

  const manifestURL = joinURL(nuxt.options.app.baseURL, 'manifest.json')

  addServerHandler({
    route: manifestURL,
    handler: pwa._resolver.resolve('./parts/manifest/handler')
  })

  pwa._manifestMeta = {
    rel: 'manifest',
    href: manifestURL
  }
}
