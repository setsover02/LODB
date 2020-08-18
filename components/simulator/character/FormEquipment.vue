<template lang="pug">
v-expansion-panel.transparent
	v-expansion-panel-header
		v-row.mr-2(align="center")
			v-col.subtitle-1.font-weight-bold 장비
	v-expansion-panel-content
		//- BEGIN: Chip1
		v-row
			v-col(cols="3")
				p.body-2.mb-2 칩
				v-select.mb-2(v-model="chip1Rank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="chip1Slot" :items="filterChip1Rank" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
				v-text-field.mb-2(v-model="chip1Enh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: CHiP1
			//- BEGIN: Chip2
			v-col(cols="3")
				p.body-2.mb-2 칩
				v-select.mb-2(v-model="chip2Rank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="chip2Slot" :items="filterChip2Rank" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
				v-text-field.mb-2(v-model="chip2Enh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: CHiP2
			//- BEGIN: OS
			v-col(cols="3")
				p.body-2.mb-2 OS
				v-select.mb-2(v-model="osRank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="osSlot" :items="filterOs" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
				v-text-field.mb-2(v-model="osEnh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: OS
			//- BEGIN: GEAR

			v-col(cols="3")
				p.body-2.mb-2 보조장비
				v-select.mb-2(v-model="gearRank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="gearSlot" :items="filterGear" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
				v-text-field.mb-2(v-model="gearEnh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
		//- END: GRAR
</template>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('equipment/asyncItems');
  },
  computed: {
    ...mapState('equipment', ['itemRank']),
    ...mapGetters('equipment', ['filterChip1Rank', 'filterChip2Rank', 'filterOs', 'filterGear']),
    chip1Rank: {
      get() {
        return this.$store.state.equipment.chip1Rank;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP1_RANK', value);
      },
    },
    chip1Slot: {
      get() {
        return this.$store.state.equipment.chip1Slot;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP1_SLOT', value);
      },
    },
    chip1Enh: {
      get() {
        return this.$store.state.equipment.chip1Enh;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP1_ENH', value);
      },
    },
    chip2Rank: {
      get() {
        return this.$store.state.equipment.chip2Rank;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP2_RANK', value);
      },
    },
    chip2Slot: {
      get() {
        return this.$store.state.equipment.chip2Slot;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP2_SLOT', value);
      },
    },
    chip2Enh: {
      get() {
        return this.$store.state.equipment.chip2Enh;
      },
      set(value) {
        this.$store.commit('equipment/SET_CHIP2_ENH', value);
      },
    },
    osRank: {
      get() {
        return this.$store.state.equipment.osRank;
      },
      set(value) {
        this.$store.commit('equipment/SET_OS_RANK', value);
      },
    },
    osSlot: {
      get() {
        return this.$store.state.equipment.osSlot;
      },
      set(value) {
        this.$store.commit('equipment/SET_OS_SLOT', value);
      },
    },
    osEnh: {
      get() {
        return this.$store.state.equipment.osEnh;
      },
      set(value) {
        this.$store.commit('equipment/SET_OS_ENH', value);
      },
    },
    gearRank: {
      get() {
        return this.$store.state.equipment.gearRank;
      },
      set(value) {
        this.$store.commit('equipment/SET_GEAR_RANK', value);
      },
    },
    gearSlot: {
      get() {
        return this.$store.state.equipment.gearSlot;
      },
      set(value) {
        this.$store.commit('equipment/SET_GEAR_SLOT', value);
      },
    },
    gearEnh: {
      get() {
        return this.$store.state.equipment.gearEnh;
      },
      set(value) {
        this.$store.commit('equipment/SET_GEAR_ENH', value);
      },
    },
  },
};
</script>
<style scoped lang="sass">

</style>