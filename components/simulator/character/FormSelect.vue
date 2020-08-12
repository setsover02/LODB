<template lang="pug">
v-row.pl-3.pr-6(align="center")
	v-col(cols="5")
		//- 검색 필터: 테이블 데이터와 동기화 중
		v-autocomplete(v-model="characterSelect" :items="characterData" item-text="name" item-value="name" label="검색 혹은 선택" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" hide-details color="primary" background-color="transparent" return-object solo flat autocomplete="off")
			//- 선택 데이터 chip 형태로 표기
			template(v-slot:selection="data")
				v-list-item.white--text(v-bind="data.attrs" :input-value="data.selected")
					v-list-item-avatar(size="56")
						v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
					v-list-item-content
						v-list-item-title.text-h6 {{ data.item.name }}
						v-list-item-subtitle.caption.t000--text {{ data.item.squad }} • {{ data.item.type }} • {{ data.item.role }}
			//- 검색 리스트에 아바타 추가
			template(v-slot:item="data")
				template(v-if="typeof data.item !== 'object'")
					v-list-item-content(v-text="data.item")
				template(v-else)
					v-list-item-avatar(size="24")
						v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
					v-list-item-content
						v-list-item-title(v-html="data.item.name")
	//- TODO: 서약 관련
	v-spacer
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
  mounted() {
    this.$store.dispatch("sheet/asyncCharacterBase");
  },
  computed: {
    ...mapState("sheet", ["characterData"]),
    ...mapState("enhance", ["rankChip"]),
		...mapGetters("sheet", ["getCharacterRank"]),
		
    characterSelect: {
      get() {
        return this.$store.state.sheet.characterSelect;
      },
      set(value) {
        this.$store.commit("sheet/SET_CHARACTERS_SELECT", value);
      }
    },
    level: {
      get() {
        return this.$store.state.enhance.level;
      },
      set(value) {
        this.$store.commit("enhance/SET_LEVEL", value);
      }
    }
  }
};
</script>
<style scoped lang="sass">
.min-width
	width: 96px
</style>
