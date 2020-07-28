<template lang="pug">
v-sheet(color="transparent")
	v-row.px-4.py-2(align="center")
		v-col.subtitle-2 링크
		v-col(cols="auto").primary--text.subtitle-2 총합
		//- 	v-chip.ml-3.white--text(small :color="totalLinkColor") {{ Math.round(getTotalLink * 100) + '%' }}
		//- v-col(cols="auto")
		//- 	v-btn(v-if="getTotalLink < 5" @click="SET_LINK_MAX" small text color="primary") Max
		//- 	v-btn(v-else @click="SET_LINK_MIN" small text color="red") Min

	v-row.px-4
		//- TODO: select 5개 모두 값이 있을 경우 풀링 보너스 선택
		v-col(v-for="(link, index) in linkSlot")
			span {{ link.input }}
			v-select(@input="updateLinkSlot(index, $event.target.value)" :items="linkSlotItem" solo flat dense attach append-icon="" hide-details)
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
	computed: {
		linkSlot() {
			return this.$store.state.characters.link.linkSlot;
		},
		...mapState("characters/link", ["linkSlotItem"]),
	},
	methods: {
		updateLinkSlot(index, val) {
			store.commit("characters/link/updateLinkSlot", { index, val })
			// this.$store.commit.characters.link.updateLinkSlot, { index, val }
		}
	}
}
</script>