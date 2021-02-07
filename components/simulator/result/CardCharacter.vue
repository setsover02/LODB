<template lang="pug">
v-card.px-6.py-4(color="transparent" flat)
	v-row(align="center")
		v-col(cols="auto").subtitle-1.font-weight-bold 최종 데미지
	v-row
		v-col(cols="12")
			v-list-item.px-0
				v-list-item-avatar(size="48")
					v-img(:src="require('~/assets/img/skill/' + getCharacterSkillFilters[0].icon + '_' + getCharacterSkillFilters[0].type + '.webp')") 
				v-list-item-content
					v-list-item-title.subtitle-1.font-weight-bold {{ getCharacterSkillFilters[0].name }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 중장형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getDamage }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getDamage }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 경장형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getDamage }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getDamage }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 기동형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getDamage }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getDamage }}
	v-divider
	v-row
		v-col(cols="12")
			v-list-item.px-0
				v-list-item-avatar(size="48")
					v-img(:src="require('~/assets/img/skill/' + getCharacterSkillFilters[1].icon + '_' + getCharacterSkillFilters[1].type + '.webp')") 
				v-list-item-content
					v-list-item-title.subtitle-1.font-weight-bold {{ getCharacterSkillFilters[1].name }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 중장형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getActive1Result }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getActive1Result }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 경장형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getActive1Result }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getActive1Result }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 기동형
					v-list-item-subtitle.text-h6.yellow--text.font-weight-bold {{ getActive1Result }}
					v-list-item-subtitle.subtitle-1.t000--text.font-weight-bold {{ getActive1Rate }}
</template>
<script>
import {mapState, mapGetters} from 'vuex';

export default {
  computed: {
		...mapGetters('character/damage', ['getDamage']),
    ...mapGetters('skill', ['getCharacterSkillFilters', 'getActive1Result', 'getActive1Rate']),
  },
};
</script>
