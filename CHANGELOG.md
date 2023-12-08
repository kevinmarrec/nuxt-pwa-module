# Changelog

All notable changes to this project will be documented in this file. See [release-please](https://github.com/googleapis/release-please) for commit guidelines.

## [0.17.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.16.2...v0.17.0) (2023-03-02)


### Bug Fixes

* **meta:** add key to metas ([329b7a7](https://github.com/kevinmarrec/nuxt-pwa-module/commit/329b7a75078f0b87c4d23fd43e00ded9c143b8c9))

### [0.16.2](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.16.1...v0.16.2) (2023-02-08)


### Bug Fixes

* **icon:** rebuild cache if icon options change ([17dfeb8](https://github.com/kevinmarrec/nuxt-pwa-module/commit/17dfeb84f69559d6ea66aa8b3e57f943e24f087d)), closes [#77](https://github.com/kevinmarrec/nuxt-pwa-module/issues/77)

### [0.16.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.16.0...v0.16.1) (2023-02-05)


### Bug Fixes

* **meta:** avoid meta duplication ([#93](https://github.com/kevinmarrec/nuxt-pwa-module/issues/93)) ([772f5b8](https://github.com/kevinmarrec/nuxt-pwa-module/commit/772f5b855d51f3bb5cd2a4f2ed8d4fd28aef9924))

## [0.16.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.15.0...v0.16.0) (2023-02-04)


### Features

* **workbox:** auto unregister when not enabled ([#92](https://github.com/kevinmarrec/nuxt-pwa-module/issues/92)) ([5b45153](https://github.com/kevinmarrec/nuxt-pwa-module/commit/5b45153e4e3e5f9dbdf19d5af73c6c819e43aacc))

## [0.15.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.14.1...v0.15.0) (2023-01-12)


### Features

* **manifest:** add manifest meta crossorigin attribute ([#87](https://github.com/kevinmarrec/nuxt-pwa-module/issues/87)) ([c430214](https://github.com/kevinmarrec/nuxt-pwa-module/commit/c4302141961c8be7eb4013e6648b47858347a79b))


### Bug Fixes

* **meta:** improve appleStatusBarStyle types ([1f318d8](https://github.com/kevinmarrec/nuxt-pwa-module/commit/1f318d89fb9238082e180ea208b23d173a508aad)), closes [#85](https://github.com/kevinmarrec/nuxt-pwa-module/issues/85)

### [0.14.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.14.0...v0.14.1) (2023-01-10)


### Bug Fixes

* nuxt bridge compat ([#84](https://github.com/kevinmarrec/nuxt-pwa-module/issues/84)) ([29cce07](https://github.com/kevinmarrec/nuxt-pwa-module/commit/29cce077b33984344ac8e0990aed1809b0ea09a1))

## [0.14.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.13.0...v0.14.0) (2023-01-05)


### Features

* **icon:** cache generated images ([#80](https://github.com/kevinmarrec/nuxt-pwa-module/issues/80)) ([e64e5da](https://github.com/kevinmarrec/nuxt-pwa-module/commit/e64e5da70591f47f311221215a041b606b2b2fe9))
* silent mode ([#83](https://github.com/kevinmarrec/nuxt-pwa-module/issues/83)) ([317f92c](https://github.com/kevinmarrec/nuxt-pwa-module/commit/317f92cb11685b9eccb0af4b28a5c553a5633df4))
* **workbox:** precaching ([#81](https://github.com/kevinmarrec/nuxt-pwa-module/issues/81)) ([3db1ee5](https://github.com/kevinmarrec/nuxt-pwa-module/commit/3db1ee5693b884f07b4305e63794a342b5ac7d72))


### Bug Fixes

* use consola level raw value for silent mode ([52372de](https://github.com/kevinmarrec/nuxt-pwa-module/commit/52372deec4641e048b5b632d4445952047e55613))

## [0.13.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.12.0...v0.13.0) (2022-11-23)

## [0.12.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.11.1...v0.12.0) (2022-11-23)


### Features

* **meta:** add hid to all meta tags ([faa5ad6](https://github.com/kevinmarrec/nuxt-pwa-module/commit/faa5ad639e8d675403199fbb191ccc2b18e8f3d8))

### [0.11.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.11.0...v0.11.1) (2022-11-17)


### Bug Fixes

* **meta:** twitter image should use ogHost ([f1c0698](https://github.com/kevinmarrec/nuxt-pwa-module/commit/f1c0698d5a251e57b232519d13c67b9407275b71))

## [0.11.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.10.0...v0.11.0) (2022-11-17)


### Bug Fixes

* **meta:** better title behavior (with opt out) ([fe1b47d](https://github.com/kevinmarrec/nuxt-pwa-module/commit/fe1b47d84a1a94457fb82a6ca2387990f2c065a7))

## [0.10.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.9.1...v0.10.0) (2022-11-07)


### Features

* **sw:** include web manifest in assets strategy ([#59](https://github.com/kevinmarrec/nuxt-pwa-module/issues/59)) ([4326eba](https://github.com/kevinmarrec/nuxt-pwa-module/commit/4326ebac0b02064958cad6035b50831a66a4fbfa))

### [0.9.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.9.0...v0.9.1) (2022-10-22)


### Bug Fixes

* prevent title override when titleTemplate is used ([8b66b07](https://github.com/kevinmarrec/nuxt-pwa-module/commit/8b66b07a8d7d3ee55637b0627e98160ce5862c73))

## [0.9.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.8.0...v0.9.0) (2022-10-22)


### Features

* add missing optional properties to ManifestOptions interface ([#55](https://github.com/kevinmarrec/nuxt-pwa-module/issues/55)) ([0779344](https://github.com/kevinmarrec/nuxt-pwa-module/commit/07793449fab4bcc5c0ffad30fe9a48d4de19b954))


### Bug Fixes

* **meta:** ability to opt-out theme_color property ([ee3070e](https://github.com/kevinmarrec/nuxt-pwa-module/commit/ee3070ee44680a5c6dc972b88393ce0750b5c376)), closes [#53](https://github.com/kevinmarrec/nuxt-pwa-module/issues/53)
* **meta:** prevent title override ([e637b0f](https://github.com/kevinmarrec/nuxt-pwa-module/commit/e637b0f6a073a4e5a80cafda2d77a7691f84531e))

## [0.8.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.7.2...v0.8.0) (2022-10-12)


### Features

* **icon:** add icon.maskableSource option ([#51](https://github.com/kevinmarrec/nuxt-pwa-module/issues/51)) ([84cb83d](https://github.com/kevinmarrec/nuxt-pwa-module/commit/84cb83d163e6e0694d14af89e786353b5e97cf73))

### [0.7.2](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.7.1...v0.7.2) (2022-10-11)


### Bug Fixes

* improve nitro config to fix nuxi generate ([b322220](https://github.com/kevinmarrec/nuxt-pwa-module/commit/b32222037915a8f060122fea686b80bb7904607f))

### [0.7.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.7.0...v0.7.1) (2022-10-11)


### Bug Fixes

* add missing import in nitro plugin ([1c1b3e2](https://github.com/kevinmarrec/nuxt-pwa-module/commit/1c1b3e225c0a7bfa4cfb4ae526a8cb30dd213728))

## [0.7.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.6.1...v0.7.0) (2022-10-11)


### Features

* add workbox.autoRegister option ([76ecf22](https://github.com/kevinmarrec/nuxt-pwa-module/commit/76ecf22f24bc4a07a14ac62b92611a91cf2ea2eb)), closes [#46](https://github.com/kevinmarrec/nuxt-pwa-module/issues/46)


### Bug Fixes

* use nitro plugin for sw registration ([79063ef](https://github.com/kevinmarrec/nuxt-pwa-module/commit/79063ef2312e05bbac4e3a1247d367392176a055)), closes [#45](https://github.com/kevinmarrec/nuxt-pwa-module/issues/45)

### [0.6.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.6.0...v0.6.1) (2022-10-01)


### Bug Fixes

* **icon:** support all icon sizes ([f342fa8](https://github.com/kevinmarrec/nuxt-pwa-module/commit/f342fa895110ad4525c8e46a9ca5574413dc4b15))

## [0.6.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.5.0...v0.6.0) (2022-10-01)


### Features

* usePWAIcon composable  ([#43](https://github.com/kevinmarrec/nuxt-pwa-module/issues/43)) ([adfac55](https://github.com/kevinmarrec/nuxt-pwa-module/commit/adfac557535b7d6b7b81939cf12ba8b08839f4c3)), closes [#42](https://github.com/kevinmarrec/nuxt-pwa-module/issues/42)

## [0.5.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.4.2...v0.5.0) (2022-09-29)


### Features

* add custom worker template option ([fd77f68](https://github.com/kevinmarrec/nuxt-pwa-module/commit/fd77f68dd19ee793c7b563e3fa6016b77d18ac9c)), closes [#16](https://github.com/kevinmarrec/nuxt-pwa-module/issues/16) [#27](https://github.com/kevinmarrec/nuxt-pwa-module/issues/27) [#29](https://github.com/kevinmarrec/nuxt-pwa-module/issues/29) [#36](https://github.com/kevinmarrec/nuxt-pwa-module/issues/36) [#38](https://github.com/kevinmarrec/nuxt-pwa-module/issues/38)


### Bug Fixes

* generate manifest.json when ssr is disabled ([8c52b11](https://github.com/kevinmarrec/nuxt-pwa-module/commit/8c52b1103d1c47c27fd3016026ba48a86ea16578)), closes [#32](https://github.com/kevinmarrec/nuxt-pwa-module/issues/32)
* **icon:** better unusual input icon handling ([8c1f8e2](https://github.com/kevinmarrec/nuxt-pwa-module/commit/8c1f8e2c715ca1416d5d3c6d4a7059fe49f8a99b)), closes [#40](https://github.com/kevinmarrec/nuxt-pwa-module/issues/40)

### [0.4.2](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.4.1...v0.4.2) (2022-07-22)


### Bug Fixes

* remove postinstall command ([d67bbc6](https://github.com/kevinmarrec/nuxt-pwa-module/commit/d67bbc6b4cc2bf1e6fc1fa43523c5301fee19907)), closes [#23](https://github.com/kevinmarrec/nuxt-pwa-module/issues/23)

### [0.4.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.4.0...v0.4.1) (2022-07-22)


### Bug Fixes

* **manifest:** move server handler to runtime ([73ee968](https://github.com/kevinmarrec/nuxt-pwa-module/commit/73ee9689ae0114d0b4f3779b2c26e58b97900bd0)), closes [#22](https://github.com/kevinmarrec/nuxt-pwa-module/issues/22)

## [0.4.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.3.1...v0.4.0) (2022-07-22)


### Bug Fixes

* prevent assets duplication on build ([e54f564](https://github.com/kevinmarrec/nuxt-pwa-module/commit/e54f5648630ca2157f14c9dd138ae0f89f193ffb)), closes [#20](https://github.com/kevinmarrec/nuxt-pwa-module/issues/20)

### [0.3.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.3.0...v0.3.1) (2022-06-24)


### Bug Fixes

* disable icon generation on stackblitz ([7813821](https://github.com/kevinmarrec/nuxt-pwa-module/commit/781382127e7773f7362d1c5f44bc4425d59a30d2))

## [0.3.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.2.2...v0.3.0) (2022-06-07)


### Features

* padded maskable icons ([8dcdefe](https://github.com/kevinmarrec/nuxt-pwa-module/commit/8dcdefe5e9bf71f64349ac4627e61e75cc96093c)), closes [#10](https://github.com/kevinmarrec/nuxt-pwa-module/issues/10)


### Bug Fixes

* use baseURL for sw/manifest/icons/splash ([#14](https://github.com/kevinmarrec/nuxt-pwa-module/issues/14)) ([aa01db1](https://github.com/kevinmarrec/nuxt-pwa-module/commit/aa01db1679eee3141d8576b24a62b3779f99960e))
* **workbox:** fix worker when using `pages` folder ([52ecdb9](https://github.com/kevinmarrec/nuxt-pwa-module/commit/52ecdb9e420bbd596389ca7bb5533ca4a10d1e32)), closes [#11](https://github.com/kevinmarrec/nuxt-pwa-module/issues/11)

### [0.2.2](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.2.1...v0.2.2) (2022-06-01)


### Bug Fixes

* adjust manifest icons purposes ([f01b0a5](https://github.com/kevinmarrec/nuxt-pwa-module/commit/f01b0a5099bf78731d0e7195b4bb0d093fce97ea)), closes [#8](https://github.com/kevinmarrec/nuxt-pwa-module/issues/8)

### [0.2.1](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.2.0...v0.2.1) (2022-05-31)


### Bug Fixes

* move sw.js on root to make app installable ([bd36561](https://github.com/kevinmarrec/nuxt-pwa-module/commit/bd365611833ea9db4e2e03066fd70322da158288))

## [0.2.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.1.0...v0.2.0) (2022-05-31)


### Features

* splash screen support ([#6](https://github.com/kevinmarrec/nuxt-pwa-module/issues/6)) ([970c5f8](https://github.com/kevinmarrec/nuxt-pwa-module/commit/970c5f89a7b6564580b36ee61052caeeeb0fb6ad))

## [0.1.0](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.0.2...v0.1.0) (2022-05-21)


### Features

* add icon generation & asset hashing ([#2](https://github.com/kevinmarrec/nuxt-pwa-module/issues/2)) ([a6ccb95](https://github.com/kevinmarrec/nuxt-pwa-module/commit/a6ccb95a74c94fd7b8b558046274b8f4406bbf6c))

### [0.0.2](https://github.com/kevinmarrec/nuxt-pwa-module/compare/v0.0.1...v0.0.2) (2022-05-15)


### Bug Fixes

* **types:** add `short_name` to `ManifestOptions` ([72ab2ce](https://github.com/kevinmarrec/nuxt-pwa-module/commit/72ab2ce7a95773e2af0568015d6b2d92afd9b191))

### 0.0.1 (2022-05-15)
