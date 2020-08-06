<template lang="pug">
  v-app-bar(clipped-left app absolute elevate-on-scroll)
    v-app-bar-nav-icon.ml-n2.mr-2(aria-label="Navigation list open." @click.stop="navDrawer = !navDrawer")
    //- v-btn(icon @click.stop="miniVariant = !miniVariant")
    //-   v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
    //- v-btn.mr-2(icon @click="backward")
    //-   v-icon mdi-arrow-left
    v-toolbar-title.font-weight-bold Last Origin
    //- v-toolbar-items
      v-btn(text) Last Origin
    v-spacer
    //- v-btn(icon target="blank" href="https://www.csvjson.com/csv2json" color="t100")
    //-   v-icon mdi-json
    v-btn(icon target="blank" href="https://github.com/setsover02/LODB" color="t000")
      v-icon mdi-github
    v-btn.ml-2(icon target="blank" href="https://discord.gg/RR8W9Dp" color="t000")
      v-icon mdi-discord
    v-btn.ml-2.mr-n2(icon target="blank" href="https://docs.google.com/spreadsheets/d/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/edit?usp=sharing" color="t000")
      v-icon mdi-google-spreadsheet
</template>
<script>
export default {
	computed: {
    navDrawer: {
      get() {
        return this.$store.state.navDrawer;
      },
      set(value) {
        this.$store.commit('SET_NAV_DRAWER', value);
      },
    },
	}
}
</script>