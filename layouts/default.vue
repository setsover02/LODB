<template lang="pug">
  v-app(:light="getTheme")
    v-card.dashboard.mx-auto.my-lg-8(shaped)
      Layout
      v-content.fill-height
        v-container(fluid).fill-height.align-start.pa-0
          nuxt
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Layout from '~/components/default/Layout.vue'
export default {
  components: {
    Layout
  },
  opts: {
    theme: {
      dark: true
    }
  },
  computed: {
    getTheme() {
      if (this.$store.state.lightTheme == false) {
        return (this.$vuetify.theme.dark = true)
      } else {
        return (this.$vuetify.theme.dark = false)
      }
    }
  }
}
</script>