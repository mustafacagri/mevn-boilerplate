export default {
  imports: {
    dirs: ['stores']
  },
  plugins: [
    { src: '~/plugins/init.server.js' } // must be the first server plugin
  ],
  app: {
    head: {
      title: 'MEVN Stack Boilerplate - Client (Nuxt 3 with pinia)',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Concert+One&family=Rubik:wght@300;400;600;800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
        }
      ]
    }
  },
  css: [
    '~/assets/scss/mixins.scss',
    '~/assets/css/main.css',
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ]
  ]
}
