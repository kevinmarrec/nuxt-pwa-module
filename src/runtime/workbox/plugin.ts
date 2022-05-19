import { join } from 'pathe'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const { buildAssetsDir } = useRuntimeConfig().app

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(join(buildAssetsDir, 'sw.js'))
    })
  }
})
