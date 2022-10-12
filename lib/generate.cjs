/* eslint-disable @typescript-eslint/no-var-requires */

const consola = require('consola')
const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')

const resizeOptions = {
  fit: 'contain',
  background: 'transparent',
}

async function ensureDir (dir) {
  await remove(dir)
  await mkdirp(dir)
}

async function generate ({ input, distDir, sizes, maskableInput, maskablePadding, splash, hash }) {
  await ensureDir(distDir)

  // Resized icons (purpose: any)
  await Promise.all(sizes.map(size =>
    sharp(input)
      .resize(Math.floor(size), Math.floor(size), resizeOptions)
      .toFile(join(distDir, `${size}x${size}${hash}.png`)),
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
      .toFile(join(distDir, `${size}x${size}.maskable${hash}.png`))
  },
  ))

  // Splash
  if (splash) {
    distDir = join(distDir, `../${splash.targetDir}`)
    await ensureDir(distDir)
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
          .toFile(join(distDir, `${device.width}x${device.height}${hash}.png`))
      }
      catch (err) {
        consola.warn(`[PWA] Failed to generate splash (${device.width}x${device.height}) because icon input has larger dimensions`)
      }
    }))
  }
}

generate(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
