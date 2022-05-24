const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')

async function splashCreation({ input, distDir, backgroundColor, devices }) {
  await remove(distDir)
  await mkdirp(distDir)
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

splashCreation(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
