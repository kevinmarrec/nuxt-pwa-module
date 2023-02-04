# Nuxt 3 PWA

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> Zero config [PWA](https://web.dev/progressive-web-apps) solution for [Nuxt 3](https://v3.nuxtjs.org)

![image](https://user-images.githubusercontent.com/25272043/171139116-b0137f28-f29d-429d-a778-9e8bbe530331.png)

## State of official module

This module is **unofficial** but aims to become the next iteration of the [official Nuxt PWA module](https://github.com/nuxt-community/pwa-module).

## Setup

Add `@kevinmarrec/nuxt-pwa` dependency to your project :

```sh
# Using Yarn
yarn add -D @kevinmarrec/nuxt-pwa
# Using NPM
npm install -D @kevinmarrec/nuxt-pwa
# Using PNPM
pnpm install -D @kevinmarrec/nuxt-pwa
```

Edit your `nuxt.config.ts` file to add PWA module :

```ts
export default defineNuxtConfig({
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ]
})
```

## Configuration

As this module tries to be compliant with Nuxt 2 PWA for easy migration, you can still use https://pwa.nuxtjs.org documentation for most features.

If you want your app to be installable in **development**, you need to set `pwa.workbox.enabled` option to `true` in your `nuxt.config`, as it's only enabled for production by default :

```ts
export default defineNuxtConfig({
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ],
  pwa: {
    workbox: {
      enabled: true
    }
  }
})
```

If you need custom workbox service worker, you can specify path to your worker with `pwa.workbox.templatePath` option, you can use path aliases like `~` and `@`.

```ts
export default defineNuxtConfig({
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ],
  pwa: {
    workbox: {
      templatePath: '~/path/to/your/worker.js'
    }
  }
})
```

> To customize it, you can check the default of this module [here](https://github.com/kevinmarrec/nuxt-pwa-module/blob/main/templates/workbox/sw.js), as well as [Nuxt 2 default](https://github.com/nuxt-community/pwa-module/blob/main/templates/workbox/sw.js) and [Workbox Documentation](https://developer.chrome.com/docs/workbox).

## Composables

### usePWAIcon (size, options)

You can use `usePWAIcon` to get icons urls of your PWA, and use it in your app.

```ts
const icon = usePWAIcon(512) // /assets/icons/512x512.png
const icon = usePWAIcon(512, { maskable: true }) // /assets/icons/512x512.maskable.png
```

Alternatively, you can benefit of available sizes with Typescript using a `string` instead of `number` size parameter :

![image](https://user-images.githubusercontent.com/25272043/193407772-2326170d-86cc-4246-ae8c-cb711b4d8aa9.png)

## Development

Make sure to install the dependencies :

```sh
pnpm install
```

Start the development server on http://localhost:3000 :

```sh
pnpm dev
```

## Example

Build & start example on http://localhost:3000 :

```sh
pnpm example:build
pnpm example:start
```

## License

Made with ❤️

Published under the [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kevinmarrec/nuxt-pwa?style=flat-square
[npm-version-href]: https://npmjs.com/package/@kevinmarrec/nuxt-pwa
[npm-downloads-src]: https://img.shields.io/npm/dm/@kevinmarrec/nuxt-pwa?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@kevinmarrec/nuxt-pwa
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/kevinmarrec/nuxt-pwa-module/ci.yml?style=flat-square
[github-actions-href]: https://github.com/kevinmarrec/nuxt-pwa-module/actions/workflows/ci.yml
[codecov-src]: https://img.shields.io/codecov/c/gh/kevinmarrec/nuxt-pwa-module/main?style=flat-square
[codecov-href]: https://codecov.io/gh/kevinmarrec/nuxt-pwa-module
