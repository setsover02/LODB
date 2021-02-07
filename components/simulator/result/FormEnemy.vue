<template lang="pug">
v-card.px-6.py-4(color="transparent" flat)
	v-row(align="center")
		v-col.subtitle-1.font-weight-bold 철충 설정
		v-col(cols="auto")
			v-btn(small color="primary") 초기화
	v-row(align="center")
		//- v-col
		//- 	v-select(:items="typeFilter" :menu-props="{ top: false }" solo flat dense append-icon="mdi-chevron-down" attach hide-details)
		v-col
			v-text-field(solo flat dense hide-details type="number" prefix="방어도" min="0")
		v-col
			v-text-field(solo flat dense hide-details type="number" prefix="피해감소" suffix="%" min="0" max="100")
	v-row(align="center")
		v-col
			v-text-field(color="red" solo flat dense hide-details type="number" prepend-icon="mdi-fire" prefix="화염저항" suffix="%" min="0" max="100")
		v-col
			v-text-field(color="blue" solo flat dense hide-details type="number" prepend-icon="mdi-water" prefix="냉기저항" suffix="%" min="0" max="100")
		v-col
			v-text-field(color="yellow" solo flat dense hide-details type="number" prepend-icon="mdi-flash" prefix="전기저항" suffix="%" min="0" max="100")
</template>
<script>
export default {
  data: () => ({
    typeFilter: ['기동형', '경장형', '중장형'],
  }),
};
</script>
