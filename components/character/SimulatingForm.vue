<template lang="pug">
//- Character Info
v-card.radial-t200
	v-list-item
		v-list-item-avatar(size="48" color="t500")
			v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
		v-list-item-content
			v-list-item-title Name
			v-list-item-subtitle A • B
		v-list-item-action.align-center
			//- 더미데이터 바인드 됨
			RarityChip(v-bind:rarity="rarity")
		v-list-item-action
			v-btn(icon)
				v-icon mdi-bookmark-outline
	v-divider
	//- Enhance Form
	//- 강화 수치
	v-row.pa-4(align="center" no-gutter)
		v-col.caption Level
		v-col
			v-text-field(dense flat solo hide-details
			type="number" autocomplete="off")
	v-divider
	v-row.pa-4.pb-2
		v-col.caption Enh
		//- v-col(cols="auto").yellow--text.caption {{ getEnhTotal }}
	v-row.px-4.pb-4
		v-col
			label.overline Damage
			v-text-field(v-model="damageEnh" @input="updateDamageEnh"
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
		v-col
			label.overline Health
			v-text-field(label="Health" v-model="healthEnh" 
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
		v-col
			label.overline Defense
			v-text-field(label="Defense" v-model="defenseEnh" 
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
		v-col
			label.overline Hit
			v-text-field(label="Hit" v-model="hitEnh" 
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
		v-col
			label.overline Crit
			v-text-field(label="Crit" v-model="critEnh" 
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
		v-col
			label.overline Dodge
			v-text-field(label="Dodge" v-model="dodgeEnh" 
			dense flat solo hide-details
			type="number" counter maxlength="3" autocomplete="off")
	v-divider
	//- 링크 퍼센티지
	v-card-title.caption Link
	v-card-text
		v-slider(v-model="link" :color="linkColor" thumb-label min="0" max="5" step="0.25" ticks="always")
			template(v-slot:prepend)
				v-icon(@click="linkMin") mdi-minus
			template(v-slot:append)
				v-icon(@click="linkMax") mdi-plus
	v-divider
	v-row.pa-4
		v-col(cols="12").caption Item
		v-col(cols="6")
			v-select(:items="dummy" dense solo flat prefix="칩" append-icon="mdi-chevron-down")
		v-col(cols="6")
			v-select(:items="dummy" dense solo flat prefix="칩" append-icon="mdi-chevron-down")
		v-col(cols="6")
			v-select(:items="dummy" dense solo flat prefix="OS" append-icon="mdi-chevron-down")
		v-col(cols="6")
			v-select(:items="dummy" dense solo flat prefix="장비" append-icon="mdi-chevron-down")
	v-row.px-4
		v-col
			v-btn(@click="addCounter" text icon) 
				v-icon mdi-plus
			v-btn(@click.stop="subConter" text icon) 
				v-icon mdi-minus
</template>
<script>
import { mapMutations } from 'vuex'
import RarityChip from '~/components/RarityChip'
export default {
  components: {
    RarityChip
  },
  data: () => ({
    dummy: ['1', '2', '3'],
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
    rarity: 'SS',
    // 강화 수치 폼
    healthEnh: 13, // * 3
    defenseEnh: 11, // *
    hitEnh: 0, // * 1.5%
    critEnh: 0, // * 0.4%
    dodgeEnh: 0, // *
    link: 5
  }),
  methods: {
    updateDamageEnh(e) {
      this.$store.commit('simulating/updateDamageEnh', e.target.value)
    },
    addCounter() {
      this.$store.commit('simulating/addCounter')
    },
    subConter() {
      this.$store.commit('simulating/subCounter')
    },
    // Link percentage Slider
    // 풀링크
    linkMax() {
      this.link = 5
    },
    // 링크 제거
    linkMin() {
      this.link = 0
    }
  },
  computed: {
    damageEnh: {
      get() {
        return this.$store.state.simulating.damageEnh
      },
      set(value) {
        this.$store.commit('updateDamageEnh', value)
      }
    },
    // 스탯 잔여포인트 계산
    // getEnhTotal() {
    //   return (
    //     270 - // = Level * 3
    //     (parseInt(this.damageEnh) +
    //       parseInt(this.healthEnh) +
    //       parseInt(this.defenseEnh) +
    //       parseInt(this.hitEnh) +
    //       parseInt(this.critEnh) +
    //       parseInt(this.dodgeEnh))
    //   )
    // },
    // 링크 슬라이더 색상
    linkColor() {
      if (this.link < 1) return 'red'
      if (this.link < 2) return 'yellow'
      if (this.link < 3) return 'green'
      if (this.link < 4) return 'mint'
      if (this.link < 4.99) return 'cyan'
      return 'blue'
    }
  }
}
</script>