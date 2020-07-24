<template lang="pug">
v-navigation-drawer(v-model="navDrawer" color="transparent" width="160" :mini-variant="miniVariant"  clipped absolute app flat mobile-break-point="0")
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
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "캐릭터",
          to: "/"
        },
        {
          title: "캐릭터(old)",
          to: "/indexElder"
        },
        {
          title: "아이템",
          to: "/items"
        },
        {
          title: "업데이트",
          to: "/release"
        },
        {
          title: "Test",
          to: "/test"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Last Origin"
    };
  },
  opts: {
    theme: {
      light: false
    }
  },
  computed: {
    navDrawer: {
      get() {
        return this.$store.state.navDrawer;
      },
      set(value) {
        this.$store.commit('SET_NAV_DRAWER', value);
      },
    },
    lightTheme: {
      get() {
        return this.$store.state.lightTheme;
      },
      set(value) {
        this.$store.commit("SET_THEME", value);
      }
    }
	},
	// 반응형 네비게이션
	//  methods: {
  //   async initNavDrawer() {
  //     if (window.innerWidth > 1264) {
  //       this.$store.commit('SET_NAV_DRAWER', false);
  //     } else {
  //       this.$store.commit('SET_NAV_DRAWER', true);
  //     }
  //   },
  // },
  // mounted() {
  //   this.initNavDrawer;
  // },
};
</script>
