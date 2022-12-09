import type { NitroAppPlugin } from 'nitropack'
import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    const config = useRuntimeConfig()
    const baseUrl = config.baseURL
    const swUrl = config?.pwa?.workbox?.swUrl ?? 'sw.js'

    htmlContext.head.push(
      [
        '<script>',
        'if (\'serviceWorker\' in navigator) {',
        `  window.addEventListener('load', () => navigator.serviceWorker.register('${joinURL(baseUrl, swUrl)}'))`,
        '}',
        '</script>',
      ].join('\n'),
    )
  })
}
