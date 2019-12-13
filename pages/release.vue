<template lang="pug">
	v-row.fill-height.overflow-x-hidden.overflow-y-auto
		v-col.mx-auto(cols="6")
			v-card.v-card--convex.px-4.py-6.mt-8.radius-20(v-for="n in 2" :key="n")
				v-card-title 2019/12/05
				v-card-subtitle.subtitle-2.white--text Bug Fixes
				v-card-text Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
				v-card-subtitle.subtitle-2.white--text Release
				v-card-text Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
</template>
<script>
export default {

}
</script>