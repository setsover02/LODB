<template lang="pug">
v-expansion-panel.transparent
	v-expansion-panel-header
		v-row.mr-2(align="center")
			v-col.subtitle-1.font-weight-bold 장비
	v-expansion-panel-content
		v-row
			v-col(cols="3")
				v-select(dense solo flat hide-details append-icon="mdi-chevron-down" )
			v-col(cols="6")
				v-autocomplete(:items="itemsData" item-text="name" item-value="id" dense solo flat hide-details prefix="칩" attach :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
							v-avatar.border-4(size="48" left tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							| {{ data.item.name + ' / ' + data.item.rank }}
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="32" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
			v-col(cols="3")
				v-text-field(value="10" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
</template>
<script>
import {mapState} from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('equipment/asyncItems');
  },
  computed: {
    ...mapState('equipment', ['itemsData']),
  },
};
</script>
