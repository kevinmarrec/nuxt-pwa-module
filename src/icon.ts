import { existsSync } from 'node:fs'
import { fork } from 'node:child_process'
import consola from 'consola'
import hasha from 'hasha'
import { join, resolve } from 'pathe'
import { joinURL } from 'ufo'
import { useNuxt } from '@nuxt/kit'
import type { PWAContext, ManifestIcon } from './types'
import { defaultDevices, metaFromDevice } from './splash'

async function getFileHash (filePath: string): Promise<string> {
  const hash = await hasha.fromFile(filePath, { algorithm: 'md5' })
  return hash.slice(0, 8)
}

interface ManifestIconMakerOptions {
  iconsDir: string
  size: number
  purpose: NonNullable<ManifestIcon['purpose']>
  hash: string
}

function makeManifestIcon ({ iconsDir, size, purpose, hash }: ManifestIconMakerOptions): ManifestIcon {
  return {
    src: joinURL(iconsDir, `${size}x${size}${purpose === 'maskable' ? '.maskable' : ''}${hash}.png`),
    type: 'image/png',
    sizes: `${size}x${size}`,
    purpose
  }
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

  // Hash as suffix for production
  const hash = nuxt.options.dev ? '' : `.${await getFileHash(options.source)}`

  const iconsDir = joinURL(
    nuxt.options.app.baseURL,
    nuxt.options.app.buildAssetsDir,
    options.targetDir
  )

  // Prepare manifest file
  for (const size of options.sizes) {
    pwa.manifest.icons.push(makeManifestIcon({ hash, iconsDir, size, purpose: 'any' }))
    pwa.manifest.icons.push(makeManifestIcon({ hash, iconsDir, size, purpose: 'maskable' }))
  }

  const isSplashSupportEnabled = pwa.meta && pwa.meta.mobileAppIOS

  // Prepare splash screens
  if (isSplashSupportEnabled) {
    if (!options.splash.backgroundColor) {
      options.splash.backgroundColor = pwa.manifest.background_color
    }

    if (options.splash.devices.length === 0) {
      options.splash.devices = defaultDevices
    }

    pwa._splashMetas = options.splash.devices.map(device =>
      metaFromDevice(device, {
        assetsDir: joinURL(
          nuxt.options.app.baseURL,
          nuxt.options.app.buildAssetsDir,
          options.splash.targetDir
        ),
        hash
      })
    )
  }

  const generateOptions = JSON.stringify({
    input: options.source,
    distDir: join(pwa._assetsDir, options.targetDir),
    sizes: options.sizes,
    maskablePadding: options.maskablePadding,
    splash: isSplashSupportEnabled ? options.splash : false,
    hash
  })

  let generate: Promise<void>

  // Start generation parallel to Nuxt build
  nuxt.hook('build:before', () => {
    // Track time
    const start = Date.now()
    // Generation Promise (generate in a child process using fork)
    generate = new Promise<void>((resolve, reject) => {
      const child = fork(pwa._resolver.resolve('../lib/generate.cjs'), [generateOptions])
      child.on('exit', (code: number) => code ? reject(code) : resolve())
    }).then(() => {
      consola.success(`PWA icons${isSplashSupportEnabled ? ' and splash screens ' : ' '}generated in ${Date.now() - start} ms`)
    })
  })

  // Ensure icons (& splash screens) have been generated before Nitro build
  nuxt.hook('nitro:build:before', async () => {
    await generate
  })
}
