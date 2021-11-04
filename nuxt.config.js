export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  server: {
    port: 3000 // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "SocialTV | Admin",
    htmlAttrs: {
      lang: "es"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
      //{ "http-equiv": 'Content-Security-Policy', content: "default-src 'self' 'unsafe-eval' 'unsafe-inline' *.miguru.ai *.googletagmanager.com *.lablab.cl localhost:* *.hotjar.com *.google-analytics.com wss:; script-src 'self' localhost:* *.lablab.cl *.miguru.ai *.googletagmanager.com *.hotjar.com *.google-analytics.com localhost:* 'unsafe-eval' 'unsafe-inline'" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/local-storage",
    "~/plugins/axios",
    { src: "~/plugins/toggle-button", ssr: false },
    "~/plugins/vee-validate.js",
    { src: "~/plugins/googleAuth.js", ssr: false }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://www.npmjs.com/package/vue-sweetalert2
    "vue-sweetalert2/nuxt"
  ],

  bootstrapVue: {
    icons: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://socialtv-admin.social-hound.com" // Used as fallback if no runtime config is provided
    //baseURL: "http://localhost:4100"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "es"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },
  buildDir: "_nuxt",
  build: {
    publicPath: "_nuxt/dist/",
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: false
        }
      }
    }
  }
};
