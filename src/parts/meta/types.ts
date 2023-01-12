export interface MetaOptions {
  name: string
  author: string | false
  title: string | boolean
  description: string | false
  favicon: boolean
  mobileApp: boolean
  mobileAppIOS: boolean
  appleStatusBarStyle: 'default' | 'black' | 'black-translucent' | false
  theme_color: string | false | undefined
  lang: string | false
  ogType: string | false
  ogSiteName: string | boolean
  ogTitle: string | boolean
  ogDescription: string | boolean
  ogImage: string | boolean | { path: string; width?: number; height?: number; type?: string }
  ogHost: string | undefined
  ogUrl: string | boolean
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player' | false
  twitterSite: string | undefined
  twitterCreator: string | undefined
}
