import { join } from 'pathe'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  if ('serviceWorker' in navigator) {
    const { baseURL } = useRuntimeConfig().app

    window.addEventListener('load', () => {
      navigator.serviceWorker.register(
        join(baseURL, 'sw.js')
      )
    })
  }
})
