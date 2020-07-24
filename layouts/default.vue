<template lang="pug">
  v-app(:light="getTheme")
    v-card.dashboard.mx-auto.my-lg-8(shaped)
      AppBar
      NavigationDrawer
      v-main.fill-height
        v-container(fluid).fill-height.align-start.pa-0
          nuxt
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppBar from "~/components/default/AppBar.vue";
import NavigationDrawer from "~/components/default/NavigationDrawer.vue";

export default {
  components: {
    AppBar,
    NavigationDrawer
  },
  opts: {
    theme: {
      dark: true
    }
  },
  computed: {
    getTheme() {
      if (this.$store.state.lightTheme == false) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>
