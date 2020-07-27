<template lang="pug">
	//- TODO: Search Config
	v-form(ref="formSearch").px-1
		v-row
			v-col.py-0
				//- 검색 필터: 테이블 데이터와 동기화 중
				v-autocomplete(v-model="characterSelect" :items="characterData" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
					//- 선택 데이터 chip 형태로 표기
					template(v-slot:selection="data")
						v-chip.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-avatar(left)
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							| {{ data.item.name }}
					//- 검색 리스트에 아바타 추가
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item")
						template(v-else)
							v-list-item-avatar(size="24")
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
					
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    characterSelect: "",
  }),
  mounted () {
		this.$store.dispatch('spreadsheet/asyncData')
  },
  computed: {
    ...mapState("spreadsheet", ["characterData"]),
  },
  methods: {}
};
</script>
