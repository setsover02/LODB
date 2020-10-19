<template lang="pug">
v-expansion-panel.transparent(disabled)
	v-divider
	v-expansion-panel-header
		v-row.mr-2(align="center")
			v-col.subtitle-1.font-weight-bold 스킬
			v-col.pl-5(cols="auto")
				v-icon(color="primary") mdi-circle-medium
				v-icon(color="primary") mdi-circle-medium
				v-icon(color="yellow") mdi-circle-medium
				v-icon(color="yellow") mdi-circle-medium
				v-icon(color="t100") mdi-circle-medium
	v-expansion-panel-content
		v-row.mb-4(align="center")
			v-spacer
			v-col(cols="auto")
				v-btn-toggle(dense mandatory color="yellow")
					v-btn(small) Normal
					v-btn(small) F.Change
		v-row
			v-col()
				v-badge(overlap content="10")
					v-avatar
						v-img(:src="require('~/assets/img/skill/AirStrike_active.webp')")
			v-col()
				v-badge(overlap content="10")
					v-avatar
						v-img(:src="require('~/assets/img/skill/AirStrike_active.webp')")
			v-col()
				v-badge(overlap content="8")
					v-avatar
						v-img(:src="require('~/assets/img/skill/AntiArmorShot_passive.webp')")
			v-col()
				v-badge(overlap content="7")
					v-avatar
						v-img(:src="require('~/assets/img/skill/AntiArmorShot_passive.webp')")
			v-col(cols="auto")
				v-avatar(color="t400")
		v-card.mb-4(flat color="transparent")
			v-card-title.px-0 대검공격
				v-switch.pt-0.mt-0.ml-auto(inset hide-details)
				v-text-field.min-width(value="10" dense flat solo hide-details type="number" counter autocomplete="off" min="0" max="3" suffix="레벨")
			v-card-text.px-0 대검으로 강하게 내리쳐 목표 지점에 [@:공격력 :1.85~0.125:배 보호 무시 피해]를 줍니다. <플라즈마 제네레이터> 중첩을 1 소모하며, 중첩이 최대면 [피해량 +:60~3:%]가 증가합니다.
		v-card.px-1.t300(flat)
			v-row.mb-2(align="center")
				v-spacer
				v-col(cols="auto")
					p.body-1.font-weight-bold.mb-0 플라즈마 제네레이터
				v-col(cols="auto")
					v-text-field.min-width(value="1" dense flat solo hide-details type="number" counter autocomplete="off" min="0" max="3" suffix="중첩")
</template>
<script>
export default {
  data: () => ({
    skillTab: null,
  }),
};
</script>
<style scoped lang="sass">
.min-width
	width: 72px
	max-width:72px
</style>