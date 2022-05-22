import { useNuxt } from '@nuxt/kit'
import type { PWAContext } from './types'

export default (pwa: PWAContext) => {
  if (!pwa.meta || !pwa.manifest) { return }

  const options = pwa.meta
  const nuxt = useNuxt()
  const head = nuxt.options.app.head as Required<typeof nuxt.options.app.head>

  // mobileApp
  if (options.mobileApp) {
    head.meta.push({ name: 'mobile-web-app-capable', content: 'yes' })
  }

  // mobileApp (IOS)
  if (options.mobileAppIOS) {
    head.meta.push({ name: 'apple-mobile-web-app-capable', content: 'yes' })
  }

  // statusBarStyle (IOS)
  if (options.mobileAppIOS || options.appleStatusBarStyle) {
    head.meta.push({
      name: 'apple-mobile-web-app-status-bar-style',
      content: options.appleStatusBarStyle || 'default'
    })
  }

  // Icons
  if (pwa.manifest && pwa.manifest.icons && pwa.manifest.icons.length > 0) {
    const iconSmall = pwa.manifest.icons[0]
    const iconBig = pwa.manifest.icons[pwa.manifest.icons.length - 1]

    // Shortcut icon
    if (options.favicon) {
      head.link.push({ rel: 'shortcut icon', href: iconSmall.src })
      head.link.push({ rel: 'apple-touch-icon', href: iconBig.src, sizes: iconBig.sizes })
    }

  }
  // TODO: Launch Screen Image (IOS)
  if (pwa.manifest.iosSplashSreen) {
    // get all images name , split `-` ,  get w and h , then inject
    head.link.push(
      { href: `${pwa.manifest.iosSplashSreen.targetDir}/iphone6-splash-screen.png`, media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" }
      // < link href = "splashscreens/iphone5_splash.png" media = "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/iphone6_splash.png" media = "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/iphoneplus_splash.png" media = "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/iphonex_splash.png" media = "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/iphonexr_splash.png" media = "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/iphonexsmax_splash.png" media = "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/ipad_splash.png" media = "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/ipadpro1_splash.png" media = "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/ipadpro3_splash.png" media = "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
      // <link href="splashscreens/ipadpro2_splash.png" media = "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel = "apple-touch-startup-image" />
    )
  }

  // Title
  head.title = options.name

  // IOS launch icon title
  head.meta.push({ name: 'apple-mobile-web-app-title', content: options.name })

  // Author
  if (options.author) {
    head.meta.push({ name: 'author', content: options.author })
  }

  // Description
  if (options.description) {
    head.meta.push({ name: 'description', content: options.description })
  }

  // Theme Color
  const themeColor = pwa.meta.theme_color || (pwa.manifest && pwa.manifest.theme_color)

  if (themeColor) {
    head.meta.push({ name: 'theme-color', content: themeColor })
  }

  // Lang
  if (options.lang) {
    head.htmlAttrs = head.htmlAttrs || {}
    head.htmlAttrs.lang = options.lang
  }

  // og:type
  if (options.ogType) {
    head.meta.push({ property: 'og:type', content: options.ogType })
  }

  // og:url
  if (options.ogHost && options.ogUrl === true) {
    options.ogUrl = options.ogHost
  }
  if (options.ogUrl && options.ogUrl !== true) {
    head.meta.push({ property: 'og:url', content: options.ogUrl })
  }

  // og:title
  if (options.ogTitle === true) {
    options.ogTitle = options.name
  }
  if (options.ogTitle) {
    head.meta.push({ property: 'og:title', content: options.ogTitle })
  }

  // og:site_name
  if (options.ogSiteName === true) {
    options.ogSiteName = options.name
  }
  if (options.ogSiteName) {
    head.meta.push({ property: 'og:site_name', content: options.ogSiteName })
  }

  // og:description
  if (options.ogDescription === true) {
    options.ogDescription = options.description
  }
  if (options.ogDescription) {
    head.meta.push({ property: 'og:description', content: options.ogDescription })
  }

  // og:image
  if (options.ogImage === true) {
    if (pwa.manifest.icons && pwa.manifest.icons.length > 0) {
      const iconBig = pwa.manifest.icons[pwa.manifest.icons.length - 1]
      const [width, height] = iconBig.sizes.split('x').map(x => +x)
      options.ogImage = { path: iconBig.src, width, height, type: iconBig.type }
    } else {
      options.ogImage = false
    }
  } else if (typeof options.ogImage === 'string') {
    options.ogImage = { path: options.ogImage }
  }

  if (options.ogImage) {
    const isUrl = (path: string) => /^https?:/.test(path)

    if (options.ogHost || isUrl(options.ogImage.path)) {
      head.meta.push({
        property: 'og:image',
        content: isUrl(options.ogImage.path) ? options.ogImage.path : options.ogHost + options.ogImage.path
      })
      if (options.ogImage.width && options.ogImage.height) {
        head.meta.push({ property: 'og:image:width', content: options.ogImage.width })
        head.meta.push({ property: 'og:image:height', content: options.ogImage.height })
      }
      if (options.ogImage.type) {
        head.meta.push({ property: 'og:image:type', content: options.ogImage.type })
      }
    }
  }

  // twitter:card
  if (options.twitterCard) {
    head.meta.push({ name: 'twitter:card', content: options.twitterCard })
  }

  // twitter:site
  if (options.twitterSite) {
    head.meta.push({ name: 'twitter:site', content: options.twitterSite })
  }

  // twitter:creator
  if (options.twitterCreator) {
    head.meta.push({ name: 'twitter:creator', content: options.twitterCreator })
  }

  // Manifest
  if (pwa._manifestMeta) {
    head.link.push(pwa._manifestMeta)
  }
}
