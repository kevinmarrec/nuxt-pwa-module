import { existsSync } from 'node:fs'
import { fork } from 'node:child_process'
import consola from 'consola'
import hasha from 'hasha'
import { join, resolve } from 'pathe'
import { useNuxt } from '@nuxt/kit'
import type { PWAContext } from './types'
import devices from './devices'

async function getFileHash (filePath: string): Promise<string> {
  const hash = await hasha.fromFile(filePath, { algorithm: 'md5' })
  return hash.slice(0, 8)
}

export const defaultSizes = [64, 120, 144, 152, 192, 384, 512]

export default async (pwa: PWAContext) => {
  if (!pwa.icon || !pwa.manifest) { return }

  const options = pwa.icon
  const nuxt = useNuxt()

  if (!options.source) {
    options.source = resolve(
      nuxt.options.srcDir,
      nuxt.options.dir.public,
      options.fileName
    )
  }

  if (!existsSync(options.source)) {
    return consola.warn(`[PWA] Icon not found at ${options.source}`)
  }

  if (options.sizes.length === 0) {
    options.sizes = defaultSizes
  }

  // Add source icon hash as suffix for production
  const iconSuffix = nuxt.options.dev ? '' : `.${await getFileHash(options.source)}`

  // Prepare manifest file
  for (const size of options.sizes) {
    pwa.manifest.icons.push({
      src: join(nuxt.options.app.buildAssetsDir, options.targetDir, `${size}x${size}${iconSuffix}.png`),
      type: 'image/png',
      sizes: `${size}x${size}`,
      // TODO: Find a solution to the 'any maskable' discouraged message from Lighthouse
      purpose: 'any maskable'
    })
  }

  if (options.splash.devices.length === 0) {
    options.splash.devices = devices
  }

  const resizeOptions = JSON.stringify({
    input: options.source,
    distDir: join(pwa._assetsDir, options.targetDir),
    sizes: options.sizes,
    suffix: iconSuffix,
    backgroundColor: pwa.manifest.background_color,
    mobileAppIOS: options.mobileAppIOS,
    devices: options.splash.devices
  })

  let generate: Promise<void>

  // Start generation parallel to Nuxt build
  nuxt.hook('build:before', () => {
    // Track time
    const start = Date.now()
    // Generation Promise (generate in a child process using fork)
    generate = new Promise<void>((resolve, reject) => {
      const child = fork(pwa._resolver.resolve('../lib/resize.cjs'), [resizeOptions])
      child.on('exit', (code: number) => code ? reject(code) : resolve())
    }).then(() => {
      consola.success(`PWA icons and splash-screen generated in ${Date.now() - start} ms`)
    })
  })

  // Ensure icons have been generated before Nitro build
  nuxt.hook('nitro:build:before', async () => {
    await generate
  })
}
