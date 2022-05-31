const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')

async function ensureDir (dir) {
  await remove(dir)
  await mkdirp(dir)
}

async function generate ({ input, distDir, sizes, splash, hash }) {
  await ensureDir(distDir)

  await Promise.all(sizes.map(size =>
    sharp(input)
      .resize(size, size)
      .toFile(join(distDir, `${size}x${size}${hash}.png`))
  ))

  if (splash) {
    distDir = join(distDir, `../${splash.targetDir}`)
    await ensureDir(distDir)
    await Promise.all(splash.devices.map(device =>
      sharp({
        create: {
          width: device.width,
          height: device.height,
          channels: 4,
          background: splash.backgroundColor
        }
      }).composite([{ input }])
        .toFile(join(distDir, `${device.width}x${device.height}${hash}.png`))
    ))
  }
}

generate(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
