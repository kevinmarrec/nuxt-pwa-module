export interface ManifestIcon {
  src: string
  type: string
  sizes: string
  purpose: 'any' | 'maskable'
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
