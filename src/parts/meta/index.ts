import { useNuxt } from '@nuxt/kit'
import type { MetaObject } from '@nuxt/schema'
import { joinURL } from 'ufo'
import type { PWAContext } from '../../types'

type NuxtAppHead = Required<MetaObject>

const isUrl = (path: string) => /^https?:/.test(path)

function addMeta (head: NuxtAppHead, name: string, content: string | number | boolean) {
  head.meta.push({ name, content })
}

function addMetaProperty (head: NuxtAppHead, property: string, content: string | number | boolean) {
  head.meta.push({ property, content })
}

export default (pwa: PWAContext) => {
  if (!pwa.meta || !pwa.manifest)
    return

  const options = pwa.meta
  const nuxt = useNuxt()
  const head = (nuxt.options.app.head || nuxt.options.head) as NuxtAppHead

  // mobileApp
  if (options.mobileApp)
    addMeta(head, 'mobile-web-app-capable', 'yes')

  // mobileApp (IOS)
  if (options.mobileAppIOS) {
    addMeta(head, 'apple-mobile-web-app-capable', 'yes')

    // Inject splash screen metas
    if (pwa._splashMetas)
      head.link.push(...pwa._splashMetas)
  }

  // statusBarStyle (IOS)
  if (options.mobileAppIOS || options.appleStatusBarStyle)
    addMeta(head, 'apple-mobile-web-app-status-bar-style', options.appleStatusBarStyle || 'default')

  // Icons
  if (pwa.manifest && pwa.manifest.icons && pwa.manifest.icons.length > 0) {
    const iconSmall = pwa.manifest.icons[0]
    const iconBig = pwa.manifest.icons[pwa.manifest.icons.length - 1]

    // Shortcut icon
    if (options.favicon) {
      head.link.push({ rel: 'icon', href: iconSmall.src, key: 'favicon' })
      head.link.push({ rel: 'apple-touch-icon', href: iconBig.src, sizes: iconBig.sizes, key: 'favicon-apple' })
    }
  }

  // Title
  if (options.title === true)
    options.title = typeof head.title == 'string' ? head.title : options.name

  if (options.title) {
    head.title = head.title ?? options.title
    // IOS launch icon title
    addMeta(head, 'apple-mobile-web-app-title', options.title)
  }

  // Author
  if (options.author)
    addMeta(head, 'author', options.author)

  // Description
  if (options.description)
    addMeta(head, 'description', options.description)

  // Theme Color
  if (options.theme_color !== false) {
    const themeColor = pwa.meta.theme_color || (pwa.manifest && pwa.manifest.theme_color)
    if (themeColor)
      addMeta(head, 'theme-color', themeColor)
  }

  // Lang
  if (options.lang) {
    head.htmlAttrs = head.htmlAttrs || {}
    head.htmlAttrs.lang = options.lang
  }

  // og:type
  if (options.ogType)
    addMetaProperty(head, 'og:type', options.ogType)

  // og:url
  if (options.ogHost && options.ogUrl === true)
    options.ogUrl = options.ogHost

  if (options.ogUrl && options.ogUrl !== true)
    addMetaProperty(head, 'og:url', options.ogUrl)

  // og:title
  if (options.ogTitle === true && options.title)
    options.ogTitle = options.title

  if (options.ogTitle)
    addMetaProperty(head, 'og:title', options.ogTitle)

  // og:site_name
  if (options.ogSiteName === true && options.name)
    options.ogSiteName = options.name

  if (options.ogSiteName)
    addMetaProperty(head, 'og:site_name', options.ogSiteName)

  // og:description
  if (options.ogDescription === true)
    options.ogDescription = options.description

  if (options.ogDescription)
    addMetaProperty(head, 'og:description', options.ogDescription)

  // og:image
  if (options.ogImage === true) {
    if (pwa.manifest.icons && pwa.manifest.icons.length > 0) {
      const iconBig = pwa.manifest.icons[pwa.manifest.icons.length - 1]
      const [width, height] = iconBig.sizes.split('x').map(x => +x)
      options.ogImage = { path: iconBig.src, width, height, type: iconBig.type }
    }
    else {
      options.ogImage = false
    }
  }
  else if (typeof options.ogImage === 'string') {
    options.ogImage = { path: options.ogImage }
  }

  if (options.ogImage && (options.ogHost || isUrl(options.ogImage.path))) {
    addMetaProperty(head, 'og:image', isUrl(options.ogImage.path) ? options.ogImage.path : joinURL(options.ogHost!, nuxt.options.app.baseURL, options.ogImage.path))
    if (options.ogImage.width && options.ogImage.height) {
      addMetaProperty(head, 'og:image:width', options.ogImage.width)
      addMetaProperty(head, 'og:image:height', options.ogImage.height)
    }
    if (options.ogImage.type)
      addMetaProperty(head, 'og:image:type', options.ogImage.type)
  }

  // twitter:card
  if (options.twitterCard)
    addMeta(head, 'twitter:card', options.twitterCard)

  // twitter:site
  if (options.twitterSite)
    addMeta(head, 'twitter:site', options.twitterSite)

  // twitter:creator
  if (options.twitterCreator)
    addMeta(head, 'twitter:creator', options.twitterCreator)

  // Manifest
  if (pwa._manifestMeta)
    head.link.push(pwa._manifestMeta)
}
