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
{
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ]
}
```

## Configuration

As this module tries to be compliant with Nuxt 2 PWA for easy migration, you can still use https://pwa.nuxtjs.org documentation for most features.

If you want your app to be installable in **development**, you need to set `pwa.workbox.enabled` option to `true` in your `nuxt.config`, as it's only enabled for production by default :

```ts
{
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ],
  pwa: {
    workbox: {
      enabled: true
    }
  }
}
```

## ⚠️ Missing features ⚠️

Compared to Nuxt 2 PWA, this module is - as for now - missing the following features:
- Workbox extra options (`enabled`, `workboxUrl`, `workboxVersion` only supported)
- OneSignal support

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

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kevinmarrec/nuxt-pwa?style=flat-square
[npm-version-href]: https://npmjs.com/package/@kevinmarrec/nuxt-pwa
[npm-downloads-src]: https://img.shields.io/npm/dm/@kevinmarrec/nuxt-pwa?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@kevinmarrec/nuxt-pwa
[github-actions-src]: https://img.shields.io/github/workflow/status/kevinmarrec/nuxt-pwa-module/CI?style=flat-square
[github-actions-href]: https://github.com/kevinmarrec/nuxt-pwa-module/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/kevinmarrec/nuxt-pwa-module/main?style=flat-square
[codecov-href]: https://codecov.io/gh/kevinmarrec/nuxt-pwa-module
