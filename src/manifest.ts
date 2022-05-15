import { join } from 'pathe'
import { addTemplate } from '@nuxt/kit'
import { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.manifest) { return }

  addTemplate({
    filename: 'manifest.json',
    dst: join(pwa._buildDir, 'manifest.json'),
    write: true,
    getContents: () => JSON.stringify(pwa.manifest, null, 2)
  })

  pwa._manifestMeta = { rel: 'manifest', href: '/manifest.json' }
}
