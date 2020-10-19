<template lang="pug">
v-expansion-panel.transparent()
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
		v-row
			v-col
</template>