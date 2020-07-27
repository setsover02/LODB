<template lang="pug">
v-row.px-4.py-2(align="center")
	v-col.subtitle-2 승급
	v-col(cols="auto")
		//- TODO: Rank Select, 승급관련 처리 필요
		v-chip-group(hide-details)
			v-chip(v-for="(item, i) in rankChip" :key="i" small :active-class="item.color + '--text'") {{ item.text }}
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("simulation", ["rankChip"])
  }
};
</script>
