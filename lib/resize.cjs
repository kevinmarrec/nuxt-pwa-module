const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')

async function resize ({ input, distDir, sizes, suffix, backgroundColor, devices, mobileAppIOS }) {
  await remove(distDir)
  await mkdirp(distDir)

  await Promise.all(sizes.map(size =>
    sharp(input)
      .resize(size, size)
      .toFile(join(distDir, `${size}x${size}${suffix}.png`))
  ))

  if (mobileAppIOS) {
    await Promise.all(devices.map(device =>
      sharp({
        create: {
          width: device.width,
          height: device.height,
          channels: 4,
          background: backgroundColor
        }
      }).composite([
        { input }
      ])
        .png()
        .toFile(join(distDir, `${device.width}x${device.height}-splash-screen.png`))
    ))
  }
}

resize(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
