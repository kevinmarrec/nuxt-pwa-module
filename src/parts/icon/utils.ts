import hasha from 'hasha'
import { joinURL } from 'ufo'
import type { IconOptions, ManifestIcon, ManifestIconMakerOptions } from './types'

export async function generateHash (options: IconOptions): Promise<string> {
  const sourceHash = await hasha.fromFile(options.source!)
  const optionsHash = await hasha(JSON.stringify(options))
  const finalHash = await hasha(`${sourceHash}${optionsHash}`, { algorithm: 'md5' })
  return finalHash.slice(0, 8)
}

export function makeManifestIcon ({ iconsDir, size, purpose, hash }: ManifestIconMakerOptions): ManifestIcon {
  return {
    src: joinURL(iconsDir, `${size}x${size}${purpose === 'maskable' ? '.maskable' : ''}.${hash}.png`),
    type: 'image/png',
    sizes: `${size}x${size}`,
    purpose,
  }
}
