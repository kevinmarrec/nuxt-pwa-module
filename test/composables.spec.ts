import { setup } from '@nuxt/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { usePWAIcon } from '../src/runtime/composables/usePWAIcon'

import './setup'

vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: {
      pwaManifest: {
        icons: [
          { sizes: '64x64', purpose: 'any', src: '/assets/icons/64x64.png' },
          { sizes: '64x64', purpose: 'maskable', src: '/assets/icons/64x64.maskable.png' }
        ]
      }
    }
  })
}))

describe('composables', async () => {
  await setup({})

  describe('usePWAIcon', () => {
    it('returns icon url', () => {
      expect(usePWAIcon(64)).toBe('/assets/icons/64x64.png')
    })

    it('returns maskable icon url when maskable option is true', () => {
      expect(usePWAIcon(64, { maskable: true })).toBe('/assets/icons/64x64.maskable.png')
    })

    it('returns empty string when icon not found', () => {
      expect(usePWAIcon(0)).toBe('')
    })
  })
})
