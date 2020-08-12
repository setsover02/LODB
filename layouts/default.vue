<template lang="pug">
  v-app(:light="getTheme")
    v-card.dashboard.mx-auto.my-lg-8(shaped)
      AppBar
      NavigationDrawer
      v-main.fill-height
        v-container(fluid).fill-height.align-start.pa-0
          nuxt
    AppFooter
</template>

<script>
import AppBar from "~/components/default/AppBar.vue";
import NavigationDrawer from "~/components/default/NavigationDrawer.vue";
import AppFooter from "~/components/default/AppFooter.vue";

export default {
  name: 'Default',
  components: {
    AppBar,
    NavigationDrawer,
    AppFooter
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
