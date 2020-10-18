<template lang="pug">
</template>
<script>
export default {
	computed: {
		chip1Rank: {
			get() {
				return this.$store.state.equipment.chip1Rank;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_RANK', value);
			},
		},
		chip1Slot: {
			get() {
				return this.$store.state.equipment.chip1Slot;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_SLOT', value);
			},
		},
		chip1Enh: {
			get() {
				return this.$store.state.equipment.chip1Enh;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_ENH', value);
			},
		},
		chip2Rank: {
			get() {
				return this.$store.state.equipment.chip2Rank;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_RANK', value);
			},
		},
		chip2Slot: {
			get() {
				return this.$store.state.equipment.chip2Slot;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_SLOT', value);
			},
		},
		chip2Enh: {
			get() {
				return this.$store.state.equipment.chip2Enh;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_ENH', value);
			},
		},
		osRank: {
			get() {
				return this.$store.state.equipment.osRank;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_RANK', value);
			},
		},
		osSlot: {
			get() {
				return this.$store.state.equipment.osSlot;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_SLOT', value);
			},
		},
		osEnh: {
			get() {
				return this.$store.state.equipment.osEnh;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_ENH', value);
			},
		},
		gearRank: {
			get() {
				return this.$store.state.equipment.gearRank;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_RANK', value);
			},
		},
		gearSlot: {
			get() {
				return this.$store.state.equipment.gearSlot;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_SLOT', value);
			},
		},
		gearEnh: {
			get() {
				return this.$store.state.equipment.gearEnh;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_ENH', value);
			},
		},
	},
};
</script>
