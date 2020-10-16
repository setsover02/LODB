<template lang="pug">
v-row.pl-3.pr-6(align="center")
	v-col(cols="6")
		//- 검색 필터: 테이블 데이터와 동기화 중
		v-autocomplete(v-model="characterSelect" :items="characterData" item-text="name" item-value="name" label="검색 혹은 선택" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" hide-details color="primary" background-color="transparent" return-object solo flat auto-select-first autocomplete="off" clearable @click:clear="value = Array[1]")
			//- 선택 데이터 chip 형태로 표기
			template(v-slot:selection="data")
				v-list-item.white--text(v-bind="data.attrs" :input-value="data.selected")
					v-list-item-avatar.radius-8(size="56")
						v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.webp')")
					v-list-item-content
						v-list-item-title.text-h6 {{ data.item.name }}
						v-list-item-subtitle.caption.t000--text {{ data.item.squad }} • {{ data.item.type }} • {{ data.item.role }}
			//- 검색 리스트에 아바타 추가
			template(v-slot:item="data")
				template(v-if="typeof data.item !== 'object'")
					v-list-item-content(v-text="data.item")
				template(v-else)
					v-list-item-avatar.radius-8(size="24")
						v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.webp')")
					v-list-item-content
						v-list-item-title(v-html="data.item.name")
	//- TODO: 서약 관련
	v-spacer
	v-col(cols="6").pa-0
		v-row(justify="end" align="center")
			v-col(cols="auto")
				v-checkbox(disabled color="red" off-icon="mdi-heart-outline" on-icon="mdi-heart")
					template(v-slot:label)
						span.overline 서약
			v-col(cols="auto")
				v-text-field(v-model="level" dense flat solo hide-details suffix="레벨" type="number" autocomplete="off" min="1" max="100" append-icon="mdi-chevron-double-up" prepend-inner-icon="mdi-chevron-double-down" @click:prepend-inner="level = 1" @click:append="level = 100" @wheel="level + 1")
			v-col(cols="auto")
				v-select.min-width(v-model="rank" :items="getRankItems" dense small-chips flat hide-details attach solo append-icon="mdi-chevron-down")
					template(v-slot:selection="data")
						v-chip(v-if="data.item == 'SS'" :input-value="data.selected" small color="orange") {{ data.item }}
						v-chip(v-else-if="data.item == 'S'" :input-value="data.selected" small color="yellow") {{ data.item }}
						v-chip(v-else-if="data.item == 'A'" :input-value="data.selected" small color="blue") {{ data.item }}
						v-chip(v-else :input-value="data.selected" small color="mint") {{ data.item }}
					template(v-slot:item="data")
						v-chip(v-if="data.item == 'SS'" small color="orange") {{ data.item }}
						v-chip(v-else-if="data.item == 'S'" small color="yellow") {{ data.item }}
						v-chip(v-else-if="data.item == 'A'" small color="blue") {{ data.item }}
						v-chip(v-else small color="mint") {{ data.item }}
</template>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('data/asyncCharacterBase');
  },
  computed: {
    ...mapState('data', ['characterData', 'characterSelect']),
    ...mapState('enhance', ['rankChip']),
		...mapGetters('enhance', ['getRankItems']),
    characterSelect: {
      get() {
        return this.$store.state.data.characterSelect;
      },
      set(value) {
        this.$store.commit('data/SET_CHARACTERS_SELECT', value);
      },
    },
    rank: {
      get() {
        return this.$store.state.enhance.rank;
      },
      set(value) {
        this.$store.commit('enhance/SET_RANK', value);
      },
    },
    level: {
      get() {
        return this.$store.state.enhance.level;
      },
      set(value) {
        this.$store.commit('enhance/SET_LEVEL', value);
      },
    },
  },
};
</script>
<style scoped lang="sass">
.min-width
	width: 96px
</style>
