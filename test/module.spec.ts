import { globby } from 'globby'
import { join, relative } from 'pathe'
import { describe, it, expect } from 'vitest'
import { setup, useTestContext } from '@nuxt/test-utils'
import { defaultSizes } from '../src/icon'
import { defaultDevices } from '../src/splash'

async function getClientFiles () {
  const { buildDir } = useTestContext().nuxt!.options
  const clientDist = join(buildDir, 'pwa')
  const files = await globby(clientDist)
  return files.map(path => relative(clientDist, path))
}

describe('module', async () => {
  await setup({})

  it('generate icons & splash screens', async () => {
    expect(await getClientFiles()).toEqual(
      expect.arrayContaining([
        ...defaultSizes.map(size =>
          expect.stringMatching(new RegExp(`assets/icons/${size}x${size}.*\\.png`))
        ),
        ...defaultDevices.map(device =>
          expect.stringMatching(new RegExp(`assets/splash/${device.width}x${device.height}.*\\.png`))
        )
      ])
    )
  })

  it('generate manifest', async () => {
    expect(await getClientFiles()).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/manifest.*\.json/)
      ])
    )
  })

  it('generate worker', async () => {
    expect(await getClientFiles()).toContain('sw.js')
  })
})
