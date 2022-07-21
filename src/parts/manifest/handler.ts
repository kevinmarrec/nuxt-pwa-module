import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  const { pwaManifest } = useRuntimeConfig()
  return pwaManifest
})
