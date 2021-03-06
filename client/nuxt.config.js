import colors from 'vuetify/es5/util/colors';
require('dotenv').config({path: '../.env'});

export default {
  server:{
    host: process.env.FRONTEND_HOST,
    port: process.env.FRONTEND_PORT,
  },
  auth: {
    redirect: {
      login: '/Login',
      logout: '/',
      callback: '/Login',
      home: false,
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'jwtToken.accessToken',
          maxAge: 60 * 30,
          global: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'jwtToken.refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 7,
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/users/auth/login', method: 'post'},
          refresh: { url: '/api/users/auth/refresh-token', method: 'post' },
          user: { url: '/api/users/auth/profile', method: 'get' },
          logout: false,
        }
      }
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'ระบบประเมินหน่วยงานมหาวิทยาลัยแม่ฟ้าหลวง',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kanit&display=swap"
      },
      { rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['@nuxtjs/dotenv', { path: '../' }],

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${process.env.AXIOS_BASEURL}`
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          background: '#e0e0e0',
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          gold: "#bc8e5d",
          red: '#881518',
          green: "#01796f",
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

}
