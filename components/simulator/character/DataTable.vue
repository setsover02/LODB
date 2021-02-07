<template lang="pug">
v-card(color="transparent" elevation="0")
	v-card-text
		v-row
			//- v-col(cols="3")
			//- 	label.overline 키(Bio)
			//- 	v-range-slider(disabled hide-details thumb-label max="200" min="0")
			//- v-col(cols="3")
			//- 	label.overline 무게(Bio)
			//- 	v-range-slider(disabled hide-details thumb-label max="200" min="0")
			//- v-col(cols="3")
			//- 	label.overline 신체나이(Bio)
			//- 	v-range-slider(disabled hide-details thumb-label max="35" min="0")
			v-col(cols="auto")
				label.overline AGS 비활성
				v-switch.ma-0(disabled inset hide-details)
	v-data-table(:headers="charactersCol" :items="characterData" item-key="code" hide-default-footer :items-per-page="itemsPerPage" fixed-header sort-by="code" height="calc(100vh - 232px)")
		template(v-slot:item.name="{ item }")
			v-list-item.px-0
				v-list-item-avatar.radius-8.my-1(size="40" color="t500")
					v-img(:src="require('~/assets/img/avatar/' + item.code + '.webp')")
				v-list-item-content
					v-list-item-title.subtitle-2 {{ item.name }}
					v-list-item-subtitle {{ item.nameEn }}
				//- v-img(v-if="")
		template(v-slot:item.rank="{ item }")
			v-chip(v-if="item.b == 'TRUE'" small color="mint") B
			v-chip(v-else-if="item.a == 'TRUE'" small color="blue") A
			v-chip(v-else-if="item.s == 'TRUE'" small color="yellow") S
			v-chip(v-else small color="orange") SS
		template(v-slot:item.squad="{ item }")
			v-list-item.px-0
				v-list-item-avatar.my-1(tile size="32" color="transparent")
					v-img(:src="require('~/assets/img/squad/' + item.squad + '.webp')")
				v-list-item-content
					v-list-item-title.body-2 {{ item.squad }}
		template(v-slot:item.company="{ item }")
			v-list-item.px-0
				v-list-item-content
					v-list-item-title.subtitle-2 {{ item.company }}
					v-list-item-subtitle {{ item.menufacturer }}
		template(v-slot:item.battleStyle="{ item }")
			v-list-item.px-0
				v-list-item-content
					v-list-item-title.subtitle-2 {{ item.battleStyle }}
					v-list-item-subtitle {{ item.weapon }}
	v-divider
	//- v-list-item.py-2
	//- 	v-pagination.justify-start(v-model="page" :length="pageCount" total-visible="12")
	//- 	v-spacer
	//- 	v-text-field(:value="itemsPerPage" type="number" min="10" max="200" @input="itemsPerPage = parseInt($event, 10)" dense solo flat suffix="개 표시" hide-details)
</template>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('data/asyncCharacterBase');
  },
  data: () => ({
    page: 1, // 페이지네이션
    pageCount: 0,
    itemsPerPage: 400,
    // rankFilter: ['SS', 'S', 'A', 'B'],
    // typeFilter: ['기동형', '경장형', '중장형'],
    // roleFilter: ['공격기', '보호기', '지원기'],
		tableFilter: null,
		showFullImage: false,
  }),
  computed: {
    ...mapState('data', ['characterData', 'charactersCol']),
    // Data table Filter
  }
};
</script>
