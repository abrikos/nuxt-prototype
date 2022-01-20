require('dotenv').config();
export default {
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'admin-types',
          path: '/admin/type/*',
          component: resolve(__dirname, 'pages/index.vue'),
        },
      )
    }
  },
  head: {
    title: 'poker',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English'
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.js',
      }
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
  },
  auth: {
    rewriteRedirects: true,
    watchLoggedIn: true,
    redirect: {
      login: '/user/login',
      logout: '/user/login',
      home: '/user/cabinet22'
    },
    strategies: {
      custom: {
        scheme: '~/schemes/custom',
        token: {
          name: 'authorization',
          property: 'token',
          global: true,
          required: true,
          type: 'BearerZZZZZZZZZ'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/token', method: 'post' }
        }
      }
    }
  },
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/api'
  },
  publicRuntimeConfig:{
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
