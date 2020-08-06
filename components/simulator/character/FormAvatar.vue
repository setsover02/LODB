<template lang="pug">
v-row.py-5(align="center")
	v-col
		v-list-item
			v-list-item-avatar(size="56")
				v-img(:src="require('~/assets/img/avatar/' + characterSelect.id + '.png')")
			v-list-item-content
				v-list-item-title.text-h6 {{ characterSelect.name }}
				v-list-item-subtitle.caption.t000--text {{ characterSelect.squad }} • {{ characterSelect.type }} • {{ characterSelect.role }}
	//- TODO: Rank Select, 승급관련 처리 필요
	v-col(cols="auto").pr-5
		v-select.min-width(:items="rankChip" :value="characterSelect.rank" dense small-chips flat hide-details attach solo append-icon="mdi-chevron-down")
			template(v-slot:selection="data")
				v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
			template(v-slot:item="data")
				//- span(small v-if="data.item == null")
				v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
	computed: {
		...mapState("characters/data", ["characterSelect"]),
		...mapState("characters/enhance", ["rankChip"]),
		...mapGetters("characters/data", ["getCharacterRank"])
	}
}
</script>
<style scoped lang="sass">
.min-width
	width: 96px
</style>