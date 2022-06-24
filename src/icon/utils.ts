import hasha from 'hasha'
import { joinURL } from 'ufo'
import type { ManifestIcon, ManifestIconMakerOptions } from './types'

export async function getFileHash (filePath: string): Promise<string> {
  const hash = await hasha.fromFile(filePath, { algorithm: 'md5' })
  return hash.slice(0, 8)
}

export function makeManifestIcon ({ iconsDir, size, purpose, hash }: ManifestIconMakerOptions): ManifestIcon {
  return {
    src: joinURL(iconsDir, `${size}x${size}${purpose === 'maskable' ? '.maskable' : ''}${hash}.png`),
    type: 'image/png',
    sizes: `${size}x${size}`,
    purpose
  }
}
