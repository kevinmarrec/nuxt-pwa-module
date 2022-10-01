import type { Resolver } from '@nuxt/kit'
import type { IconOptions } from './parts/icon/types'
import type { MetaOptions } from './parts/meta/types'
import type { ManifestOptions } from './parts/manifest/types'
import type { WorkboxOptions } from './parts/workbox/types'

export interface PWAOptions {
  icon: IconOptions | false
  meta: MetaOptions | false
  manifest: ManifestOptions | false
  workbox: WorkboxOptions | false
}

export interface PWAContext extends PWAOptions {
  _buildDir: string
  _buildAssetsDir: string
  _manifestMeta?: { rel: 'manifest'; href: string }
  _splashMetas?: Array<{ rel: 'apple-touch-startup-image'; href: string; media: string }>
  _resolver: Resolver
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    pwa?: { [K in keyof PWAOptions]?: Partial<PWAOptions[K]> }
  }
  interface NuxtOptions {
    pwa: PWAOptions
  }
}
