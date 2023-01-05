/* eslint-disable @typescript-eslint/no-var-requires */

const _consola = require('consola')
const { remove, mkdirp, existsSync, copy } = require('fs-extra')
const { join, resolve } = require('pathe')
const sharp = require('sharp')

const consola = _consola.create({ level: process.env.NUXT_PWA_SILENT === '1' ? -Infinity : undefined })
const pkgName = require(join(__dirname, '../package.json')).name

const resizeOptions = {
  fit: 'contain',
  background: 'transparent',
}

async function ensureDir (dir) {
  await remove(dir)
  await mkdirp(dir)
}

async function generate ({ input, buildAssetsDir, targetDir, sizes, maskableInput, maskablePadding, splash, hash }) {
  const cacheDir = resolve(`node_modules/.cache/${pkgName}/${hash}`)

  if (!existsSync(cacheDir)) {
    const iconCacheDir = join(cacheDir, targetDir)
    await ensureDir(iconCacheDir)

    // Resized icons (purpose: any)
    await Promise.all(sizes.map(size =>
      sharp(input)
        .resize(Math.floor(size), Math.floor(size), resizeOptions)
        .toFile(join(iconCacheDir, `${size}x${size}.${hash}.png`)),
    ))

    // Resized icons (purpose: maskable)
    await Promise.all(sizes.map(async (size) => {
      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      }).composite([{
        input: await sharp(maskableInput)
          .resize(Math.floor(size * (1 - maskablePadding / 100)), Math.floor(size * (1 - maskablePadding / 100)), resizeOptions)
          .toBuffer(),
      }])
        .toFile(join(iconCacheDir, `${size}x${size}.maskable.${hash}.png`))
    },
    ))

    // Splash
    if (splash) {
      const splashCacheDir = join(cacheDir, splash.targetDir)
      await ensureDir(splashCacheDir)

      await Promise.all(splash.devices.map(async (device) => {
        try {
          await sharp({
            create: {
              width: device.width,
              height: device.height,
              channels: 4,
              background: splash.backgroundColor,
            },
          }).composite([{
            input: await sharp(input).resize(512, 512, resizeOptions).toBuffer(),
          }])
            .toFile(join(cacheDir, splash.targetDir, `${device.width}x${device.height}.${hash}.png`))
        }
        catch (err) {
          consola.warn(`[PWA] Failed to generate splash (${device.width}x${device.height}) because icon input has larger dimensions`)
        }
      }))
    }
  }

  await ensureDir(buildAssetsDir)
  await copy(cacheDir, buildAssetsDir)
}

generate(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
