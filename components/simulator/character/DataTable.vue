<template lang="pug">
v-card(color="transparent" elevation="0")
	v-card-title
		v-switch.ma-0(label="AGS" inset hide-details)
	v-data-table(:headers="charactersCol" :items="characterData" item-key="id" hide-default-footer :items-per-page="itemsPerPage" fixed-header sort-by="id" height="calc(100vh - 192px)")
		template(v-slot:item.avatar="{ item }")
			v-avatar.radius-8.my-1(size="40" color="t500")
				v-img(:src="require('~/assets/img/avatar/' + item.id + '.webp')")
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
	}),
	computed: {
		...mapState('data', ['characterData', 'charactersCol']),
	}
}
</script>