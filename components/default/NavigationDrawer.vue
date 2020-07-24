<template lang="pug">
v-navigation-drawer(:mini-variant="navDrawer" color="transparent" width="240" clipped absolute app flat mobile-breakpoint="0")
		v-list.py-12.mt-4.py-lg-0.mt-lg-0
			v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
				v-list-item-icon 
					v-icon(v-text="item.icon")
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
			items: [
				{
					icon: "mdi-account-supervisor-circle",
					title: "캐릭터",
					to: "/"
				},
				{ icon: "mdi-account-supervisor-outline", title: "캐릭터(old)", to: "/indexElder" },
				{ icon: "mdi-sword-cross", title: "아이템", to: "/items" },
				{ icon: "mdi-update", title: "업데이트", to: "/release" },
				{ icon: "mdi-wrench", title: "Test", to: "/test" }
			],
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
				this.$store.commit("SET_NAV_DRAWER", value);
			}
		},
		lightTheme: {
			get() {
				return this.$store.state.lightTheme;
			},
			set(value) {
				this.$store.commit("SET_THEME", value);
			}
		}
	}
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
