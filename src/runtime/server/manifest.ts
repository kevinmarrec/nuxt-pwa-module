import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const { pwaManifest } = useRuntimeConfig()
  return pwaManifest
})
