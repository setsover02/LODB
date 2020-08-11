<template lang="pug">
//- Character Info
v-sheet.pa-0(color="transparent")
	FormSelect
	v-divider
	v-row.fill-height(v-if="getCharacterId === 'undefined'" no-gutters)
		v-col.fill-height(cols="12")
			v-card.d-flex.flex-column.align-center.justify-center(tile color="transparent" elevation="0") 
				//- v-avatar(size="144")
				//-   v-icon(color="t200" size="144") mdi-account-group-outline
					//- v-img(:src="require('~/assets/img/avatar/undefined.png')")
				span.t100--text.text-h4.font-weight-bold Select Character first
	v-row(v-else no-gutters)
		v-col(cols="6")
			CardPreview
		v-divider(vertical)
		v-col
			//- Card : DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
			v-card(tile color="transparent" elevation="0")
				v-tabs(v-model="characterTabs" background-color="transparent" grow)
					v-tab 강화
					v-tab 스킬
					v-tab 아이템
					v-tab(disabled) 스쿼드
				v-divider
				v-tabs-items.fill-height__vh-n33.overflow-x-hidden.overflow-y-auto.transparent(v-model="characterTabs")
					v-tab-item
						FormLink
						v-divider
						FormEnhance
					v-tab-item
						div 스킬
</template>
<script>
import { mapGetters } from "vuex";
import FormSelect from "~/components/simulator/character/FormSelect";
import FormEnhance from "~/components/simulator/character/FormEnhance";
import FormLink from "~/components/simulator/character/FormLink";
import CardPreview from "~/components/simulator/character/CardPreview";

export default {
  components: {
    FormSelect,
    FormEnhance,
		FormLink,
		CardPreview
  },
  computed: {
    ...mapGetters("characters/data", ["getCharacterId"])
  },
  data: () => ({
    characterTabs: null
  })
};
</script>
