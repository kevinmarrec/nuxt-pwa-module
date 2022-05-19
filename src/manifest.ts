import { join } from 'pathe'
import { addTemplate, useNuxt } from '@nuxt/kit'
import { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  const nuxt = useNuxt()
  const filename = 'pwa.manifest.json'

  addTemplate({
    filename,
    dst: join(pwa._assetsDir, filename),
    write: true,
    getContents: () => JSON.stringify(pwa.manifest, null, 2)
  })

  pwa._manifestMeta = {
    rel: 'manifest',
    href: join(nuxt.options.app.buildAssetsDir, filename)
  }
}
