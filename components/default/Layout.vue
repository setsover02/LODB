<template lang="pug">
div
  v-app-bar(clipped-left app absolute elevate-on-scroll)
    v-app-bar-nav-icon.ml-n2.mr-2(aria-label="Navigation list open." @click.stop="drawer = !drawer")
    //- v-btn(icon @click.stop="miniVariant = !miniVariant")
    //-   v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
    //- v-btn.mr-2(icon @click="backward")
    //-   v-icon mdi-arrow-left
    v-toolbar-title.font-weight-bold {{ title }}
    //- v-toolbar-items
      v-btn(text) {{ title }}
    v-spacer
    v-btn(icon target="blank" href="https://www.csvjson.com/csv2json" color="t100")
      v-icon mdi-json
    v-btn.ml-2(icon target="blank" href="https://discord.gg/RR8W9Dp" color="t000")
      v-icon mdi-discord
    v-btn.ml-2.mr-n2(icon target="blank" href="https://docs.google.com/spreadsheets/d/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/edit?usp=sharing" color="t000")
      v-icon mdi-google-spreadsheet
    //- v-btn(text target="blank" href="https://app.gitbook.com/@setsover02/s/lodb/" color="primary") GitBook

  v-navigation-drawer(v-model="drawer" color="transparent" width="160" :mini-variant="miniVariant"  clipped absolute app flat mobile-break-point="0")
    v-list.py-12.mt-4.py-lg-0.mt-lg-0
      v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
        v-list-item-content
          v-list-item-title.body-2.font-weight-black(v-text="item.title")
    template(v-slot:append)
      v-divider
      v-list-item.py-4
        v-checkbox.mt-0.pt-0(disabled v-model="lightTheme" hide-details inset color="orange" off-icon="mdi-weather-night" on-icon="mdi-weather-sunset")
          template(v-slot:label) 
            span.overline Theme
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          title: '캐릭터',
          to: '/'
        },
        {
          title: '아이템',
          to: '/items'
        },
        {
          title: '업데이트',
          to: '/release'
        },
        {
          title: 'Test',
          to: '/test'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Last Origin'
    }
  },
  opts: {
    theme: {
      light: false
    }
  },
  computed: {
    lightTheme: {
      get() {
        return this.$store.state.lightTheme
      },
      set(value) {
        this.$store.commit('SET_THEME', value)
      }
    }
  }
}
</script>
