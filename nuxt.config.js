import colors from "vuetify/es5/util/colors";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "Last Origin Simulator",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "//script.sheetsu.com/" }] // Google Spreadsheet
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [{ src: "~assets/scss/main.scss" }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-webfontloader"],

  // axios: {
  //   baseURL: process.env.BASE_URL
  //   //  baseURL: 'point_to_your_URI'
  // },
  webfontloader: {
    google: {
      families: ["Noto Sans KR:100,300,400,500,700"]
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true, // If use variable.scss
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          // Basic theme color
          t100: "#5D658E",
          t200: "#4D557A",
          t300: "#444A6D",
          t400: "#2D324D",
          t500: "#272B45",
          // Key color
          primary: "#647EFF", // Lilac
          secondary: "#7C60F7", // Purple
          accent: "#F8D4A1", // Yellow
          // Optional color
          purple: "#7C60F7",
          lilac: "#647EFF",
          blue: "#78A7F8",
          skyblue: "#7FCBEC",
          cyan: "#0AD8DD",
          mint: "#7BE9CD",
          green: "#C7F5A5",
          yellow: "#F8D4A1",
          orange: "#f4b771",
          red: "#E36A98",
          pink: "#E875C7"
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
