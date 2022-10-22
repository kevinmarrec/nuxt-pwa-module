export type ManifestDisplay = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'

export type ManifestDisplayOverride = ManifestDisplay | 'window-controls-overlay'

export type ManifestOrientation = 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary'

export type ManifestPlatform = 'chrome_web_store' | 'play' | 'itunes' | 'webapp' | 'windows' | 'f-droid' | 'amazon'

export interface ManifestIcon {
  src: string
  type: string
  sizes: string
  purpose: 'any' | 'maskable' | 'monochrome'
}

export interface ManifestScreenshot {
  src: string
  type: string
  sizes: string
}

export interface ManifestShortcut {
  name: string
  short_name: string
  url: string
  icons: ManifestIcon[]
}

export interface ManifestRelatedApplication {
  id: string
  platform: ManifestPlatform
  url: string
}

export interface ManifestShareTarget {
  action: string
  method?: 'GET' | 'POST' 
  enctype?: string
  params: {
    title?: string
    text?: string
    url?: string
    files?: {
      name: string
      accept: string
    }
  }
}

export interface ManifestProtocolHandler {
  protocol: string
  url: string
}

export interface ManifestOptions {
  id?: string,
  name: string
  short_name: string
  description: string
  lang: string
  scope?: string
  start_url: string
  display: ManifestDisplay
  display_override?: ManifestDislplayOverlay[]
  orientation?: ManifestOrientation
  background_color: string
  theme_color: string
  categories?: string[]
  icons: ManifestIcon[]
  screenshots?: ManifestScreenshot[]
  shortcuts?: ManifestShortcut[]
  related_applications?: ManifestRelatedApplication[]
  prefer_related_applications?: boolean
  share_target?: ManifestShareTarget
  protocol_handlers?: ManifestProtocolHandler[]
}
