import type { ManifestIcon } from '../../parts/manifest/types'
import type { IconSize } from '#pwa'
import { useRuntimeConfig } from '#imports'

export function usePWAIcon (size: IconSize, { maskable } = { maskable: false }) {
  return (useRuntimeConfig().public.pwaManifest.icons as ManifestIcon[])
    .find(i => i.sizes === `${+size}x${+size}` && i.purpose === (maskable ? 'maskable' : 'any'))
    ?.src || ''
}
