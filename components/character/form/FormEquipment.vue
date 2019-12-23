<template lang="pug">
//- TODO: 아이템 슬롯
v-row.px-4.py-2.pb-4(no-gutter)
	v-col(cols="12").subtitle-2 아이템
	v-col(cols="9")
		v-autocomplete(v-model="chipF" :items="getChipData" item-text="name" item-value="id" dense solo flat hide-details prefix="칩" attach :menu-props="{ top: true }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
			template(v-slot:selection="data")
				v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
					v-avatar.border-4(left tile)
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
		v-text-field(v-model="chipFEnh" value="10" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")

	v-col(cols="9")
		v-autocomplete(v-model="chipS" :items="getChipData" item-text="name" item-value="id" dense solo flat hide-details prefix="칩" attach :menu-props="{ top: true }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
			template(v-slot:selection="data")
				v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
					v-avatar.border-4(left tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					| {{ data.item.name + '/' + data.item.rank }}
			template(v-slot:item="data")
				template(v-if="typeof data.item !== 'object'")
					v-list-item-content(v-text="data.item.name")
				template(v-else)
					v-list-item-avatar.border-4(size="32" tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					v-list-item-content
						v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
	v-col(cols="3")
		v-text-field(v-model="chipSEnh" value="10" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")

	v-col(cols="9")
		v-autocomplete(v-model="os" :items="getOsData" item-text="name" item-value="id" dense solo flat hide-details prefix="OS" attach :menu-props="{ top: true }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
			template(v-slot:selection="data")
				v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
					v-avatar.border-4(left tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					| {{ data.item.name + '/' + data.item.rank }}
			template(v-slot:item="data")
				template(v-if="typeof data.item !== 'object'")
					v-list-item-content(v-text="data.item.name")
				template(v-else)
					v-list-item-avatar.border-4(size="32" tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					v-list-item-content
						v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
	v-col(cols="3")
		v-text-field(v-model="osEnh" value="10" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
	v-col(cols="9")
		v-autocomplete(v-model="gear" :items="getGearData" item-text="name" item-value="id" dense solo flat hide-details prefix="보조" attach :menu-props="{ top: true }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
			template(v-slot:selection="data")
				v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
					v-avatar.border-4(left tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id + '.png')")
					| {{ data.item.name + '/' + data.item.rank }}
			template(v-slot:item="data")
				template(v-if="typeof data.item !== 'object'")
					v-list-item-content(v-text="data.item.name")
				template(v-else)
					v-list-item-avatar.border-4(size="32" tile)
						v-img(:src="require('~/assets/img/items/' + data.item.id +'.png')")
					v-list-item-content
						v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
	v-col(cols="3")
		v-text-field(v-model="gearEnh" value="10" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    equipmentSelect: null
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
  }),
  computed: {
    ...mapGetters('equip', [
      'getEquipmentData',
      'getChipData',
      'getOsData',
      'getGearData'
    ]),
    chipF: {
      get() {
        return this.$store.state.equip.chipF
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_F', value)
      }
    },
    chipFEnh: {
      get() {
        return this.$store.state.equip.chipFEnh
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_F_ENH', value)
      }
    },
    chipS: {
      get() {
        return this.$store.state.equip.chipS
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_S', value)
      }
    },
    chipSEnh: {
      get() {
        return this.$store.state.equip.chipSEnh
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_S_ENH', value)
      }
    },
    os: {
      get() {
        return this.$store.state.equip.os
      },
      set(value) {
        this.$store.commit('equip/SET_OS', value)
      }
    },
    osEnh: {
      get() {
        return this.$store.state.equip.osEnh
      },
      set(value) {
        this.$store.commit('equip/SET_OS_ENH', value)
      }
    },
    gear: {
      get() {
        return this.$store.state.equip.gear
      },
      set(value) {
        this.$store.commit('equip/SET_GEAR', value)
      }
    },
    gearEnh: {
      get() {
        return this.$store.state.equip.gearEnh
      },
      set(value) {
        this.$store.commit('equip/SET_GEAR_ENH', value)
      }
    }
  }
}
</script>