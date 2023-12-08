import type { NitroAppPlugin } from 'nitropack'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(
      [
        '<script>',
        'if (\'serviceWorker\' in navigator) {',
        '  navigator.serviceWorker.getRegistrations().then((registrations) => {',
        '    for (const registration of registrations) {',
        '      console.info(\'[PWA] Unregistering Service Worker:\', registration)',
        '      registration.unregister()',
        '    }',
        '  })',
        '}',
        'if (\'caches\' in window) {',
        '  caches.keys()',
        '    .then((keys) => {',
        '      if (keys.length) {',
        '        console.info(\'[PWA] Cleaning cache for:\', keys.join(\', \'))',
        '        for (const key of keys) {',
        '          caches.delete(key)',
        '        }',
        '      }',
        '    })',
        '}',
        '</script>'
      ].join('\n')
    )
  })
}
