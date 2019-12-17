<template lang="pug">
div
	//- TODO: 아이템 슬롯
	v-row.px-4.py-2.pb-4(no-gutter)
		v-col(cols="12").subtitle-2 아이템
		v-col(cols="12") 
			span {{ getDamage }}, {{getChip1Hit}}
		v-col(cols="9")
			v-autocomplete(v-model="chip1" :items="getEquipmentData" item-text="name" item-value="id" dense solo flat hide-details prefix="칩" attach :menu-props="{ top: true }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
				template(v-slot:selection="data")
					v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
						v-avatar.border-4(size="24" left tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						| {{ data.item.name + '/' + data.item.rank }}
				template(v-slot:item="data")
					template(v-if="typeof data.item !== 'object'")
						v-list-item-content(v-text="data.item.name")
					template(v-else)
						v-list-item-avatar.border-4(size="24" tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						v-list-item-content
							v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
		v-col(cols="3")
			v-text-field(v-model="chip1Enh" value="10" solo flat dense hide-details type="number" suffix="강화" min="1" max="10")
		v-col(cols="9")
			v-autocomplete(v-model="chip2" :items="getEquipmentData" item-text="name" item-value="id" dense solo flat hide-details prefix="칩" attach :menu-props="{ top: true }" append-icon="mdi-chevron-down" autocomplete="off")
				template(v-slot:selection="data")
					v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
						v-avatar.border-4(size="24" left tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						| {{ data.item.name + '/' + data.item.rank }}
				template(v-slot:item="data")
					template(v-if="typeof data.item !== 'object'")
						v-list-item-content(v-text="data.item.name")
					template(v-else)
						v-list-item-avatar.border-4(size="24" tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						v-list-item-content
							v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
		v-col(cols="3")
			v-text-field(v-model="chip2Enh" solo flat dense hide-details type="number" suffix="강화" min="1" max="10")
		v-col(cols="9")
			v-autocomplete(v-model="os" :items="getEquipmentData" item-text="name" item-value="id" dense solo flat hide-details prefix="OS" attach :menu-props="{ top: true }" append-icon="mdi-chevron-down" autocomplete="off")
				template(v-slot:selection="data")
					v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
						v-avatar.border-4(size="24" left tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						| {{ data.item.name + '/' + data.item.rank }}
				template(v-slot:item="data")
					template(v-if="typeof data.item !== 'object'")
						v-list-item-content(v-text="data.item.name")
					template(v-else)
						v-list-item-avatar.border-4(size="24" tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						v-list-item-content
							v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
		v-col(cols="3")
			v-text-field(v-model="osEnh" solo flat dense hide-details type="number" suffix="강화" min="1" max="10")
		v-col(cols="9")
			v-autocomplete(v-model="gear" :items="getEquipmentData" item-text="name" item-value="id" dense solo flat hide-details prefix="보조" attach :menu-props="{ top: true }" append-icon="mdi-chevron-down" autocomplete="off")
				template(v-slot:selection="data")
					v-chip.white--text(small v-bind="data.attrs" :input-value="data.selected" color="transparent")
						v-avatar.border-4(size="24" left tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						| {{ data.item.name + '/' + data.item.rank }}
				template(v-slot:item="data")
					template(v-if="typeof data.item !== 'object'")
						v-list-item-content(v-text="data.item.name")
					template(v-else)
						v-list-item-avatar.border-4(size="24" tile)
							v-img(:src="require('~/assets/img/items/414.png')")
						v-list-item-content
							v-list-item-title(v-html="data.item.name + '/' + data.item.rank")
		v-col(cols="3")
			v-text-field(v-model="gearEnh" solo flat dense hide-details type="number" suffix="강화" min="1" max="10")
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data: () => ({
    equipmentSelect: null
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
  }),
  computed: {
    ...mapGetters('equip', [
      'getEquipmentData',
			'getChip1Damage',
			'getDamage',
      'getChip1Hit'
    ]),
    chip1: {
      get() {
        return this.$store.state.equip.chip1
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_1', value)
      }
    },
    chip1Enh: {
      get() {
        return this.$store.state.equip.chip1Enh
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_1_ENH', value)
      }
    },
    chip2: {
      get() {
        return this.$store.state.equip.chip2
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_2', value)
      }
    },
    chip2Enh: {
      get() {
        return this.$store.state.equip.chip2Enh
      },
      set(value) {
        this.$store.commit('equip/SET_CHIP_2_ENH', value)
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
        this.$store.commit('equip/SET_OS', value)
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