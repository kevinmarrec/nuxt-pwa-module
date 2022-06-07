import { joinURL } from 'ufo'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  if ('serviceWorker' in navigator) {
    const { baseURL } = useRuntimeConfig().app

    window.addEventListener('load', () => {
      navigator.serviceWorker.register(
        joinURL(baseURL, 'sw.js')
      )
    })
  }
})
