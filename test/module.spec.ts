import { setup } from '@nuxt/test-utils'
import { describe, it, expect } from 'vitest'
import { defaultSizes } from '../src/icon'
import { defaultDevices } from '../src/splash'

import './setup'

describe('module', async () => {
  await setup({})

  it('generate & serve icons (+ splash screens)', async () => {
    for (const size of defaultSizes) {
      await expect(`assets/icons/${size}x${size}.png`).toBeGenerated()
      await expect(`assets/icons/${size}x${size}.maskable.png`).toBeGenerated()
      await expect(`assets/icons/${size}x${size}.png`).toBeServed()
      await expect(`assets/icons/${size}x${size}.maskable.png`).toBeServed()
    }

    for (const device of defaultDevices) {
      await expect(`assets/splash/${device.width}x${device.height}.png`).toBeGenerated()
      await expect(`assets/splash/${device.width}x${device.height}.png`).toBeServed()
    }
  })

  it('generate & serve manifest', async () => {
    await expect('manifest.json').toBeGenerated()
    await expect('manifest.json').toBeServed()
  })

  it('generate & serve worker', async () => {
    await expect('sw.js').toBeGenerated()
    await expect('sw.js').toBeServed()
  })
})
