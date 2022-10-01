import { setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'
import { defaultSizes } from '../src/parts/icon'
import { defaultDevices } from '../src/parts/icon/splash'

import './setup'

describe('module', async () => {
  await setup({})

  it('generate & serve icons (+ splash screens)', async () => {
    for (const size of defaultSizes) {
      const icon = `icons/${size}x${size}.png`
      const maskableIcon = `icons/${size}x${size}.maskable.png`
      await expect(icon).toBeGenerated()
      await expect(maskableIcon).toBeGenerated()
      await expect(icon).toBeServed()
      await expect(maskableIcon).toBeServed()
    }

    for (const device of defaultDevices) {
      const splash = `splash/${device.width}x${device.height}.png`
      await expect(splash).toBeGenerated()
      await expect(splash).toBeServed()
    }
  })

  it('serve manifest', async () => {
    const manifest = 'manifest.json'
    await expect(manifest).toBeServed()
  })

  it('generate & serve worker', async () => {
    const worker = 'sw.js'
    await expect(worker).toBeGenerated()
    await expect(worker).toBeServed()
  })
})
