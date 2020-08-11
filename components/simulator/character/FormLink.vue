<template lang="pug">
v-sheet.pb-4(color="transparent")
	v-row.px-4.py-2(align="center")
		v-col.subtitle-1.font-weight-bold 링크
		v-col(cols="auto").primary--text.subtitle-2 총합
			v-chip.ml-3.white--text(small :color="totalLinkColor") {{ Math.round(getTotalLink * 100) + '%' }}
		v-col(cols="auto")
			v-btn(v-if="getTotalLink < 5" @click="SET_LINK_MAX" small text color="primary") Max
			v-btn(v-else @click="SET_LINK_MIN" small text color="red") Min

	v-row.px-4
		//- TODO: select 5개 모두 값이 있을 경우 풀링 보너스 선택
		v-col
			v-select(v-model="linkSlot1" :menu-props="{ top: false }" :items="linkSlotItem" solo flat dense attach append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot2" :menu-props="{ top: false }" :items="linkSlotItem" solo flat dense attach append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot3" :menu-props="{ top: false }" :items="linkSlotItem" solo flat dense attach append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot4" :menu-props="{ top: false }" :items="linkSlotItem" solo flat dense attach append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot5" :menu-props="{ top: false }" :items="linkSlotItem" solo flat dense attach append-icon="" suffix="%" hide-details)
		v-col(cols="12")
			v-select(v-model="fullLinkBonus" :menu-props="{ top: false }" :items="getFullLinkBonusFilters" solo flat dense append-icon="mdi-chevron-down" attach prefix="풀링크 보너스" hide-details)
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
	mounted () {
		this.$store.dispatch('characters/data/asyncCharacterRank')
  },
	methods: {
		...mapMutations("characters/link", ["SET_LINK_MAX", "SET_LINK_MIN"])
	},
	computed: {
		...mapState("characters/link", ["linkSlotItem"]),
		...mapGetters("characters/link", ["getTotalLink", "getFullLinkBonusFilters"]),
		
		// 링크 슬롯(퍼센티지 합산)
		linkSlot1: {
			get() {
				return this.$store.state.characters.link.linkSlot1;
			},
			set(value) {
				this.$store.commit("characters/link/SET_LINK_SLOT1", value);
			}
		},
		linkSlot2: {
			get() {
				return this.$store.state.characters.link.linkSlot2;
			},
			set(value) {
				this.$store.commit("characters/link/SET_LINK_SLOT2", value);
			}
		},
		linkSlot3: {
			get() {
				return this.$store.state.characters.link.linkSlot3;
			},
			set(value) {
				this.$store.commit("characters/link/SET_LINK_SLOT3", value);
			}
		},
		linkSlot4: {
			get() {
				return this.$store.state.characters.link.linkSlot4;
			},
			set(value) {
				this.$store.commit("characters/link/SET_LINK_SLOT4", value);
			}
		},
		linkSlot5: {
			get() {
				return this.$store.state.characters.link.linkSlot5;
			},
			set(value) {
				this.$store.commit("characters/link/SET_LINK_SLOT5", value);
			}
		},
		fullLinkBonus: {
			get() {
				return this.$store.state.enhance.fullLinkBonus;
			},
			set(value) {
				this.$store.commit("characters/link/SET_FULLLINK_BONUS", value);
			}
		},
		totalLinkColor() {
			if (this.$store.getters["characters/link/getTotalLink"] < 5) return "red";
			else return "primary";
		}
	}
};
</script>
