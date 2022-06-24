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
