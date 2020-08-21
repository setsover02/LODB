<template lang="pug">
	v-row.fill-height.overflow-x-hidden.overflow-y-auto
		v-col.mx-auto(cols="12" xl="6" lg="8" md="10")
			v-card.v-card--convex.pa-4.mt-12.radius-20
				v-card-subtitle.pb-1 2020/08/21
				v-card-title.pt-0.title.t000--text 캐릭터 시뮬레이션 업데이트
				v-card-text.body-1.t000--text 아이템 장착 시뮬레이션 및 강화, 링크 등 시뮬레이션 폼 업데이트
</template>
<script>
export default {
  transition: "slide-y-transition"
};
</script>
