<template lang="pug">
div
	v-row
		v-col
			v-data-iterator(:items="equipment" :search="search" hide-default-footer)
				template(v-slot:header)
					v-card.mb-1.radial-t200
						v-row
							v-col.pl-3(cols="auto")
								//- TODO: 장비 종류
								v-chip-group.pt-1(multiple row active-class="accent--text")
									v-chip(label small) OS
									v-chip(label small) 칩
									v-chip(label small) 보조장비
							v-divider(vertical)
							v-col.pl-3(cols="auto")
								v-chip-group.pt-1(multiple column)
									v-chip(label small active-class="orange--text") SS
									v-chip(label small active-class="yellow--text") S
									v-chip(label small active-class="blue--text") A
									v-chip(label small active-class="mint--text") B
							v-divider(vertical)
							v-col.pr-2
								v-text-field(v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
								hide-details color="primary" background-color="transparent" solo flat)
				template(v-slot:default="props")
					//- Item Card
					v-row
						v-col(cols="2" v-for="item in props.items" :key="item.id")
							v-card.radial-t200
								v-list-item
									v-list-item-avatar.radius-4(size="48" color="t500" tile)
										v-img(:src="require('~/assets/img/items/414.png')")
									v-list-item-content
										v-list-item-title {{ item.name }}
										v-list-item-subtitle {{ item.part }}
									v-list-item-action
										v-chip(label small color="orange") {{ item.rank }}
								//- TODO: Data Table
								v-simple-table(dense)
									template(v-slot:default)
										thead
											tr
												th 강화레벨
												th.text-right(v-if="item.damage") 공격력
												th.text-right(v-if="item.hit") 적중
										tbody
											tr(v-for="(damage, i) in item.damage" :key="i" v-if="i < 10")
												td {{ i + 1 }}
												td.text-right {{ item.damage[i] }}
												//- td {{ item.hit[i] }}
				
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      search: '',
      filter: {}
    }
  },
  computed: {
    ...mapState([
      'equipment', // json
		]),
  }
}
</script>