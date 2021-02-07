<template lang="pug">
v-expansion-panel.transparent
	v-divider
	v-expansion-panel-header
		v-row.mr-2(align="center")
			v-col.subtitle-1.font-weight-bold 스킬
			v-col.pl-5(cols="auto")
				v-chip.ml-2(small color="yellow") 10
				v-chip.ml-2(small color="yellow") 10
				v-chip.ml-2(small color="primary") 9
				v-chip.ml-2(small color="primary") 8
				v-chip.ml-2(small color="t100") 10
	v-expansion-panel-content
		v-row(align="center")
			v-col
				v-tabs(v-model="skillTabs" height="56" hide-slider)
					v-tab.flex-grow-1.px-2(v-for="item in getCharacterSkillFilters" :ripple="false")
						v-badge(overlap content="10")
							v-avatar(size="40")
								v-img(:src="require('~/assets/img/skill/' + item.icon + '_' + item.type + '.webp')")
			v-col(cols="auto")
				//- TODO: Form change
				v-checkbox(on-icon="mdi-alpha-f-box" off-icon="mdi-alpha-n")
		v-tabs-items(v-model="skillTabs" )
			v-tab-item(v-for="item in getCharacterSkillFilters")
				v-card(flat)
					v-card-title.px-0 {{ item.name }}
						v-switch.pt-0.mt-0.ml-auto(inset hide-details)
						v-text-field.min-width(value="10" dense flat solo hide-details type="number" counter autocomplete="off" min="0" max="3" suffix="레벨")
					v-card-text.t000--text.body-1.px-0(v-text="item.description")
		v-card.linear-lilac
			v-row.px-1.mb-2(align="center")
				v-spacer
				v-col(cols="auto")
					p.body-1.font-weight-bold.t500--text.mb-0 플라즈마 제네레이터
				v-col(cols="auto")
					v-text-field.min-width(value="1" dense flat solo hide-details type="number" counter autocomplete="off" min="0" max="3" suffix="중첩")
</template>
<script>
import {mapState, mapGetters} from 'vuex';

export default {
  data: () => ({
    skillTabs: null,
  }),
  computed: {
		...mapState('enhance', ['rank']),
    ...mapGetters('skill', ['getCharacterSkillFilters']),
  },
};
</script>
<style scoped lang="sass">
.min-width
	width: 72px
	max-width:72px
</style>