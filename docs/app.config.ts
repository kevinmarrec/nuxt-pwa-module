export default defineAppConfig({
  github: {
    owner: 'kevinmarrec',
    repo: 'nuxt-pwa-module',
    branch: 'main',
  },
  docus: {
    title: 'Nuxt PWA',
    socials: {
      twitter: '@nuxt_js',
      github: 'kevinmarrec/nuxt-pwa-module',
    },
    header: {
      logo: true,
    },
    footer: {
      iconLinks: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          icon: 'IconNuxt',
        },
        {
          label: 'Vue Telescope',
          href: 'https://vuetelescope.com',
          icon: 'IconVueTelescope',
        },
      ],
    },
  },
})
