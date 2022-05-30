import { globby } from 'globby'
import { join, relative } from 'pathe'
import { describe, it, expect } from 'vitest'
import { setup, useTestContext } from '@nuxt/test-utils'
import { defaultSizes } from '../src/icon'

async function getClientFiles () {
  const { buildDir } = useTestContext().nuxt!.options
  const clientDist = join(buildDir, 'dist/client')
  const files = await globby(clientDist)
  return files.map(path => relative(clientDist, path))
}

describe('module', async () => {
  await setup({})

  it('generate icons', async () => {
    expect(await getClientFiles()).toEqual(
      expect.arrayContaining(
        defaultSizes.map(size =>
          expect.stringMatching(new RegExp(`icons/${size}x${size}.*\\.png`))
        )
      )
    )
  })

  it('generate manifest', async () => {
    expect(await getClientFiles()).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/pwa\.manifest.*\.json/)
      ])
    )
  })

  it('generate worker', async () => {
    expect(await getClientFiles()).toContain('sw.js')
  })
})
