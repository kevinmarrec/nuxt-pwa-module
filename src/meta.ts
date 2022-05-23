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
    // Load from constat file
    const devices = [
      { width: 2732, height: 2048, pixelRatio: 2, orientation: 'landscape' },
      { width: 1668, height: 2388, pixelRatio: 2, orientation: 'portrait' },
      { width: 2388, height: 1668, pixelRatio: 2, orientation: 'landscape' },
      { width: 1536, height: 2048, pixelRatio: 2, orientation: 'portrait' },
      { width: 2048, height: 1536, pixelRatio: 2, orientation: 'landscape' },
      { width: 1668, height: 2224, pixelRatio: 2, orientation: 'portrait' },
      { width: 2224, height: 1668, pixelRatio: 2, orientation: 'landscape' },
      { width: 1620, height: 2160, pixelRatio: 2, orientation: 'portrait' },
      { width: 2160, height: 1620, pixelRatio: 2, orientation: 'landscape' },
      { width: 1284, height: 2778, pixelRatio: 2, orientation: 'portrait' },
      { width: 2778, height: 1284, pixelRatio: 3, orientation: 'landscape' },
      { width: 1170, height: 2532, pixelRatio: 3, orientation: 'portrait' },
      { width: 2532, height: 1170, pixelRatio: 3, orientation: 'landscape' },
      { width: 1125, height: 2436, pixelRatio: 3, orientation: 'portrait' },
      { width: 2436, height: 1125, pixelRatio: 3, orientation: 'landscape' },
      { width: 1242, height: 2688, pixelRatio: 3, orientation: 'portrait' },
      { width: 2688, height: 1242, pixelRatio: 3, orientation: 'landscape' },
      { width: 828, height: 1792, pixelRatio: 2, orientation: 'portrait' },
      { width: 1792, height: 828, pixelRatio: 2, orientation: 'landscape' },
      { width: 1242, height: 2208, pixelRatio: 2, orientation: 'portrait' },
      { width: 2208, height: 1242, pixelRatio: 2, orientation: 'landscape' },
      { width: 750, height: 1334, pixelRatio: 2, orientation: 'portrait' },
      { width: 1334, height: 750, pixelRatio: 2, orientation: 'landscape' },
      { width: 640, height: 1136, pixelRatio: 2, orientation: 'portrait' },
      { width: 1136, height: 640, pixelRatio: 2, orientation: 'landscape' }
    ]
    for (const device of devices) {
      head.link.push(
        { href: `${device.width}-${device.height}-splash-screen.png`, media: `(device-width: ${device.width / 2}px) and (device-height: ${device.height / 2}px) and (-webkit-device-pixel-ratio: ${device.pixelRatio}) and (orientation: ${device.orientation})`, rel: "apple-touch-startup-image" }
      )
    }
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
