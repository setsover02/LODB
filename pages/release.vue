<template lang="pug">
	v-row
		v-col.mx-auto(cols="6")
			v-timeline(dense align-top small)
				v-timeline-item(v-for="n in 10" :key="n")
					v-row
						v-col(cols="auto")
						v-col
							v-card
								v-card-subtitle 2019/11/24
								v-card-text Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
								v-card-title Bug Fixes
								v-card-text Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
</template>