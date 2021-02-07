<template lang="pug">
v-card(color="transparent" elevation="0")
	v-data-table(:headers="charactersSkillCol" :items="characterSkill" item-key="name" hide-default-footer :items-per-page="itemsPerPage" fixed-header sort-by="name" height="calc(100vh - 232px)")
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
    this.$store.dispatch('skill/asyncCharacterSkill');
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
    ...mapState('skill', ['characterSkill', 'charactersSkillCol']),
  }
};
</script>
