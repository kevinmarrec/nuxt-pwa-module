import type { Device } from './splash'

export interface IconOptions {
  source: string | null
  fileName: string
  sizes: number[]
  targetDir: string
  splash: {
    backgroundColor: string | undefined
    devices: Device[]
    targetDir: string
  }
}

export interface MetaOptions {
  name: string
  author: string
  description: string
  favicon: boolean
  mobileApp: boolean
  mobileAppIOS: boolean
  appleStatusBarStyle: boolean
  theme_color: string | undefined
  lang: string
  ogType: string
  ogSiteName: boolean | string
  ogTitle: boolean | string
  ogDescription: boolean | string
  ogImage: boolean | string | { path: string, width?: number, height?: number, type?: string }
  ogHost: string | undefined
  ogUrl: boolean | string
  twitterCard: string | undefined
  twitterSite: string | undefined
  twitterCreator: string | undefined
}

export interface ManifestIcon {
  src: string
  type: string
  sizes: string
  purpose?: string
}

export interface ManifestOptions {
  name: string
  short_name: string
  description: string
  lang: string
  start_url: string
  display: string
  background_color: string
  theme_color: string
  icons: ManifestIcon[]
}

export interface WorkboxOptions {
  enabled: boolean
  workboxVersion: string
  workboxUrl: string | null
}

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
