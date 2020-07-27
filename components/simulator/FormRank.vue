<template lang="pug">
v-sheet(color="transparent")
	v-row.px-4.py-2(align="center")
		v-col.subtitle-2 승급
		v-col(cols="auto")
			//- TODO: Rank Select, 승급관련 처리 필요
			v-chip-group(hide-details)
				v-chip(active-class="orange--text" small) SS
				v-chip(active-class="yellow--text" small) S
				v-chip(active-class="blue--text" small) A
				v-chip(active-class="mint--text" small disabled) B
				v-chip(v-for="(rank, i) in rankChip" :key="i" small) {{ rankChip.text }}
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState("simulation", ["rankChip"])
  }
};
</script>
