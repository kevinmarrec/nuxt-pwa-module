import { join } from 'pathe'
import { joinURL } from 'ufo'
import { addServerHandler, addTemplate, useNuxt } from '@nuxt/kit'
import type { PWAContext } from '../../types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest)
    return

  const nuxt = useNuxt()
  const { crossorigin, ...manifest } = pwa.manifest

  nuxt.options.runtimeConfig.public.pwaManifest = manifest

  if (nuxt.options.ssr) {
    addServerHandler({
      route: '/manifest.json',
      handler: pwa._resolver.resolve('./runtime/server/manifest'),
    })
  }
  else {
    addTemplate({
      filename: 'manifest.json',
      getContents: () => JSON.stringify(manifest),
      dst: join(pwa._buildDir, 'manifest.json'),
      write: true,
    })
  }

  pwa._manifestMeta = {
    rel: 'manifest',
    href: joinURL(nuxt.options.app.baseURL, 'manifest.json'),
    crossorigin,
  }
}
