<template lang="pug">
v-row.py-2(align="center")
	v-col
		v-list-item
			v-list-item-avatar(size="56")
				v-img(:src="require('~/assets/img/avatar/' + characterSelect.id + '.png')")
			v-list-item-content
				v-list-item-title.text-h6 {{ characterSelect.name }}
				v-list-item-subtitle.caption.t000--text {{ characterSelect.squad }} • {{ characterSelect.type }} • {{ characterSelect.role }}
	//- TODO: 서약 관련
	v-col(cols="auto")
		v-checkbox(color="red" off-icon="mdi-heart-outline" on-icon="mdi-heart")
			template(v-slot:label)
				span.overline 서약
	v-col(cols="auto")
		v-text-field(v-model="level" dense flat solo hide-details suffix="레벨" type="number" autocomplete="off" min="1" max="100" append-icon="mdi-chevron-double-up" prepend-inner-icon="mdi-chevron-double-down" @click:prepend-inner="level = 1" @click:append="level = 100")
		
	//- TODO: Rank Select, 승급관련 처리 필요
	v-col(cols="auto")
		v-select.min-width(:items="rankChip" :value="characterSelect.rank" dense small-chips flat hide-details attach solo append-icon="mdi-chevron-down")
			template(v-slot:selection="data")
				v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
			template(v-slot:item="data")
				//- span(small v-if="data.item == null")
				v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
	
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("characters/data", ["characterSelect"]),
    ...mapState("characters/enhance", ["rankChip"]),
    ...mapGetters("characters/data", ["getCharacterRank"]),
    level: {
      get() {
        return this.$store.state.characters.enhance.level;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_LEVEL", value);
      }
    }
  }
};
</script>
<style scoped lang="sass">
.min-width
	width: 96px
</style>
