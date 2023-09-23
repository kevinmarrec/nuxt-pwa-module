import { join } from 'pathe'
import type { Device } from './types'

// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/#device-screen-sizes-and-orientations

// Portraits
const portraits: Device[] = [
  { width: 640, height: 1136, pixelRatio: 2 },
  { width: 750, height: 1334, pixelRatio: 2 },
  { width: 828, height: 1792, pixelRatio: 2 },
  { width: 1125, height: 2436, pixelRatio: 3 },
  { width: 1170, height: 2532, pixelRatio: 3 },
  { width: 1242, height: 2208, pixelRatio: 3 },
  { width: 1242, height: 2688, pixelRatio: 3 },
  { width: 1284, height: 2778, pixelRatio: 2 },
  { width: 1536, height: 2048, pixelRatio: 2 },
  { width: 1620, height: 2160, pixelRatio: 2 },
  { width: 1668, height: 2224, pixelRatio: 2 },
  { width: 1668, height: 2388, pixelRatio: 2 },
].map(device => ({ ...device, orientation: 'portrait' }))

// Landscapes
const landscapes: Device[] = [
  { width: 1136, height: 640, pixelRatio: 2 },
  { width: 1334, height: 750, pixelRatio: 2 },
  { width: 1792, height: 828, pixelRatio: 2 },
  { width: 2048, height: 1536, pixelRatio: 2 },
  { width: 2160, height: 1620, pixelRatio: 2 },
  { width: 2208, height: 1242, pixelRatio: 3 },
  { width: 2224, height: 1668, pixelRatio: 2 },
  { width: 2388, height: 1668, pixelRatio: 2 },
  { width: 2436, height: 1125, pixelRatio: 3 },
  { width: 2532, height: 1170, pixelRatio: 3 },
  { width: 2688, height: 1242, pixelRatio: 3 },
  { width: 2732, height: 2048, pixelRatio: 2 },
  { width: 2778, height: 1284, pixelRatio: 3 },
].map(device => ({ ...device, orientation: 'landscape' }))

export const defaultDevices = [
  ...portraits,
  ...landscapes,
]

export function metaFromDevice (device: Device, options: { assetsDir: string; hash: string }) {
  const { width, height, pixelRatio, orientation } = device
  const { assetsDir, hash } = options

  return {
    href: join(assetsDir, `${width}x${height}.${hash}.png`),
    media: [
      `(device-width: ${width / pixelRatio}px)`,
      `(device-height: ${height / pixelRatio}px)`,
      `(-webkit-device-pixel-ratio: ${pixelRatio})`,
      `(orientation: ${orientation})`,
    ].join(' and '),
    rel: 'apple-touch-startup-image' as const,
  }
}
