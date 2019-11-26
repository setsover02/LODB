import colors from "vuetify/es5/util/colors";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
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
          t100: "#373B76",
          t200: "#2F3365",
          t300: "#272A54",
          t400: "#1F2142",
          t500: "#171831",
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
  webfontloader: {
    google: {
      families: ["Noto Sans KR:100,300,400,500,700"]
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
