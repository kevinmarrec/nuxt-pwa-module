import { existsSync } from 'fs'
import { resolve } from 'pathe'
import { useNuxt } from '@nuxt/kit'
import type { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.icon || !pwa.manifest) { return }

  const nuxt = useNuxt()

  if (!pwa.icon.source) {
    pwa.icon.source = resolve(nuxt.options.srcDir, nuxt.options.dir.public, pwa.icon.fileName)
  }

  if (!existsSync(pwa.icon.source)) {
    // eslint-disable-next-line no-console
    console.warn(`[pwa] [icon] Icon not found in ${pwa.icon.source}`)
    return
  }

  if (pwa.icon.sizes.length === 0) {
    pwa.icon.sizes = [64, 120, 144, 152, 192, 384, 512]
  }

  for (const size of pwa.icon.sizes) {
    // TODO: Generate icons
    pwa.manifest.icons.push({
      src: '/icon.png',
      type: 'image/png',
      sizes: `${size}x${size}`,
      // TODO: Find a solution to the 'any maskable' discouraged message from Lighthouse
      purpose: 'any maskable'
    })
  }
}
