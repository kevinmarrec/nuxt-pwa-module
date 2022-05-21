import { join } from 'pathe'
import hasha from 'hasha'
import { addTemplate, useNuxt } from '@nuxt/kit'
import { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  const nuxt = useNuxt()

  const manifestJson = JSON.stringify(pwa.manifest, null, 2)

  const filename = nuxt.options.dev
    ? 'pwa.manifest.json'
    : `pwa.manifest.${hasha(manifestJson, { algorithm: 'md5' }).slice(0, 8)}.json`

  addTemplate({
    filename,
    dst: join(pwa._assetsDir, filename),
    write: true,
    getContents: () => manifestJson
  })

  pwa._manifestMeta = {
    rel: 'manifest',
    href: join(nuxt.options.app.buildAssetsDir, filename)
  }
}
