const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')


//  should be one ONE file
const devices = [
  { width: 2732, height: 2048, pixelRatio: 2, orientation: 'landscape' },
  { width: 1668, height: 2388, pixelRatio: 2, orientation: 'portrait' },
  { width: 2388, height: 1668, pixelRatio: 2, orientation: 'landscape' },
  { width: 1536, height: 2048, pixelRatio: 2, orientation: 'portrait' },
  { width: 2048, height: 1536, pixelRatio: 2, orientation: 'landscape' },
  { width: 1668, height: 2224, pixelRatio: 2, orientation: 'portrait' },
  { width: 2224, height: 1668, pixelRatio: 2, orientation: 'landscape' },
  { width: 1620, height: 2160, pixelRatio: 2, orientation: 'portrait' },
  { width: 2160, height: 1620, pixelRatio: 2, orientation: 'landscape' },
  { width: 1284, height: 2778, pixelRatio: 2, orientation: 'portrait' },
  { width: 2778, height: 1284, pixelRatio: 3, orientation: 'landscape' },
  { width: 1170, height: 2532, pixelRatio: 3, orientation: 'portrait' },
  { width: 2532, height: 1170, pixelRatio: 3, orientation: 'landscape' },
  { width: 1125, height: 2436, pixelRatio: 3, orientation: 'portrait' },
  { width: 2436, height: 1125, pixelRatio: 3, orientation: 'landscape' },
  { width: 1242, height: 2688, pixelRatio: 3, orientation: 'portrait' },
  { width: 2688, height: 1242, pixelRatio: 3, orientation: 'landscape' },
  { width: 828, height: 1792, pixelRatio: 2, orientation: 'portrait' },
  { width: 1792, height: 828, pixelRatio: 2, orientation: 'landscape' },
  { width: 1242, height: 2208, pixelRatio: 2, orientation: 'portrait' },
  { width: 2208, height: 1242, pixelRatio: 2, orientation: 'landscape' },
  { width: 750, height: 1334, pixelRatio: 2, orientation: 'portrait' },
  { width: 1334, height: 750, pixelRatio: 2, orientation: 'landscape' },
  { width: 640, height: 1136, pixelRatio: 2, orientation: 'portrait' },
  { width: 1136, height: 640, pixelRatio: 2, orientation: 'landscape' }
]


async function splashCreation({ input, distDir, backgroundColor }) {
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
      .toFile(join(distDir, `${device.width}-${device.height}-splash-screen.png`))
  ))
}

splashCreation(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
