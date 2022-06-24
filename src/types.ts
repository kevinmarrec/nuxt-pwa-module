import { IconOptions } from './icon/types'
import { MetaOptions } from './meta/types'
import { ManifestOptions } from './manifest/types'
import { WorkboxOptions } from './workbox/types'

export interface PWAOptions {
  icon: IconOptions | false
  meta: MetaOptions | false
  manifest: ManifestOptions | false
  workbox: WorkboxOptions | false
}

export interface PWAContext extends PWAOptions {
  _rootDir: string
  _assetsDir: string
  _manifestMeta?: { rel: 'manifest', href: string }
  _splashMetas?: Array<{ rel: 'apple-touch-startup-image', href: string, media: string }>
  _resolver: { resolve: (...path: string[]) => string }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    pwa?: { [K in keyof PWAOptions]?: Partial<PWAOptions[K]> }
  }
  interface NuxtOptions {
    pwa: PWAOptions
  }
}
