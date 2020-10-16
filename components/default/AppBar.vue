<template lang="pug">
  v-app-bar(clipped-left app absolute elevate-on-scroll)
    //- v-app-bar-nav-icon.ml-n2.mr-2(aria-label="Navigation list open." @click.stop="navDrawer = !navDrawer")
    //- v-btn(icon @click.stop="miniVariant = !miniVariant")
    //-   v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
    //- v-btn.mr-2(icon @click="backward")
    //-   v-icon mdi-arrow-left
    v-toolbar-title.pl-3.font-weight-bold Last Origin
    //- v-toolbar-items
      v-btn(text) Last Origin
    v-spacer
    //- v-btn(icon target="blank" href="https://www.csvjson.com/csv2json" color="t100")
    //-   v-icon mdi-json
    v-toolbar-items(v-for="(item, i) in navigation")
      v-btn(:to="item.to" text) {{ item.title }}
    v-spacer
    v-btn(color="blue" x-small text href="mailto:setsover02@naver.com") setsover02@naver.com
    v-btn.mr-1(icon target="blank" href="https://github.com/setsover02/LODB" color="t000")
      v-icon mdi-github
</template>
<script>
export default {
  data: () => ({
    navigation: [
      {
        icon: "mdi-account-supervisor-circle",
        title: "캐릭터",
        to: "/"
      },
      { icon: "mdi-update", title: "업데이트", to: "/release" },
    ]
  }),

  computed: {
    navDrawer: {
      get() {
        return this.$store.state.navDrawer;
      },
      set(value) {
        this.$store.commit("SET_NAV_DRAWER", value);
      }
    }
  }
};
</script>
