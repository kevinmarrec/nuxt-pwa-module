# Nuxt 3 PWA

> Zero config [PWA](https://web.dev/progressive-web-apps) solution for [Nuxt 3](https://v3.nuxtjs.org)

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
  buildModules: [
    '@kevinmarrec/nuxt-pwa'
  ]
}
```

## Configuration

As this module tries to be compliant with Nuxt 2 PWA for easy migration, you can still use https://pwa.nuxtjs.org documentation.

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
