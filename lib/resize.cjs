const { remove, mkdirp } = require('fs-extra')
const { join } = require('pathe')
const sharp = require('sharp')

async function resize ({ input, distDir, sizes }) {
  await remove(distDir)
  await mkdirp(distDir)
  await Promise.all(sizes.map(size =>
    sharp(input)
      .resize(size, size)
      .toFile(join(distDir, `${size}x${size}.png`))
  ))
}

resize(JSON.parse(process.argv[2])).then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error) // eslint-disable-line no-console
  process.exit(1)
})
