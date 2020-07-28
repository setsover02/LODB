<template lang="pug">
v-row.px-4.py-2(align="center")
	v-col(cols="6")
		//- TODO: Rank Select, 승급관련 처리 필요
		//- span {{ getCharacterRank }}
		span.subtitle-2 등급
		v-chip-group(hide-details)
			v-chip(v-for="(item, i) in rankChip" :key="i" small :active-class="item.color + '--text'") {{ item.text }}
	v-col(cols="6")
		span.subtitle-2 레벨
		v-text-field(v-model="level" dense flat solo hide-details suffix="레벨" type="number" autocomplete="off" min="1" max="100" append-icon="mdi-chevron-double-up" prepend-inner-icon="mdi-chevron-double-down" @click:prepend-inner="level = 1" @click:append="level = 100")
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
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
	},
};
</script>
