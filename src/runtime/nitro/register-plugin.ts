import type { NitroAppPlugin } from 'nitropack'
import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(
      [
        '<script>',
        'if (\'serviceWorker\' in navigator) {',
        `  window.addEventListener('load', () => navigator.serviceWorker.register('${joinURL(useRuntimeConfig().app.baseURL, 'sw.js')}'))`,
        '}',
        '</script>'
      ].join('\n')
    )
  })
}
