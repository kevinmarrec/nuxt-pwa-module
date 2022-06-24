import hasha from 'hasha'
import { join } from 'pathe'
import { joinURL } from 'ufo'
import { addTemplate, useNuxt } from '@nuxt/kit'
import { PWAContext } from '../types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  const nuxt = useNuxt()

  const manifestJson = JSON.stringify(pwa.manifest, null, 2)

  const filename = nuxt.options.dev
    ? 'manifest.json'
    : `manifest.${hasha(manifestJson, { algorithm: 'md5' }).slice(0, 8)}.json`

  addTemplate({
    filename,
    dst: join(pwa._rootDir, filename),
    write: true,
    getContents: () => manifestJson
  })

  pwa._manifestMeta = {
    rel: 'manifest',
    href: joinURL(nuxt.options.app.baseURL, filename)
  }
}
