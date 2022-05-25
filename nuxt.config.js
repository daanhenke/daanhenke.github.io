export default {
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: 8000
  },

  head: {
    title: 'personal-site',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/default-theme.css',
    'animate.css/animate.min.css'
  ],

  plugins: [],
  buildModules: [
    'nuxt-windicss',
    '@nuxtjs/google-fonts',
    'nuxt-pdf'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/svg-sprite'
  ],

  pdf: {
    dir: 'static',
    meta: {
      title: 'CV',
      author: 'Daan Henke'
    },
    pdf: {
      printBackground: true
    },
    routes: [
      {
        file: 'cv.pdf',
        route: '/',
        keep: true
      }
    ]
  },

  googleFonts: {
    families: {
      'Roboto': true
    }
  },

  content: {},
  build: {},
  components: true
}
