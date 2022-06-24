import type { ManifestIcon } from '../manifest/types'

export interface Device {
  width: number
  height: number
  pixelRatio: number
  orientation: 'portrait' | 'landscape'
}

export interface IconOptions {
  source: string | null
  fileName: string
  sizes: number[]
  maskablePadding: number
  targetDir: string
  splash: {
    backgroundColor: string | undefined
    devices: Device[]
    targetDir: string
  }
}

export interface ManifestIconMakerOptions {
  iconsDir: string
  size: number
  purpose: NonNullable<ManifestIcon['purpose']>
  hash: string
}

export type {
  ManifestIcon
}
