<template lang="pug">
v-sheet(color="transparent")
	//- 링크 퍼센티지
	v-row.px-4.py-2(align="center")
		v-col.subtitle-2 링크
		v-col(cols="auto").primary--text.subtitle-2 총합
			v-chip.ml-3.white--text(small :color="totalLinkColor") {{ Math.round(getTotalLink * 100) + '%' }}
		v-col(cols="auto")
			v-btn(v-if="getTotalLink < 5" @click="SET_LINK_MAX" small text color="primary") Max
			v-btn(v-else @click="SET_LINK_MIN" small text color="red") Min
	v-row.px-4
		//- TODO: select 5개 모두 값이 있을 경우 풀링 보너스 선택
		v-col
			v-select(v-model="linkSlot1" :items="linkSlotItem" solo flat dense append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot2" :items="linkSlotItem" solo flat dense append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot3" :items="linkSlotItem" solo flat dense append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot4" :items="linkSlotItem" solo flat dense append-icon="" suffix="%" hide-details)
		v-col
			v-select(v-model="linkSlot5" :items="linkSlotItem" solo flat dense append-icon="" suffix="%" hide-details)
		//- TODO: 해당 캐릭터 풀링 보너스 선택 : 값이 0 일 경우 표기하지 않는 방법 찾기
		v-col(cols="12")
			v-select(v-model="fullLinkBonus" :items="getCharacterFullLinkBonus" solo flat dense append-icon="mdi-chevron-down" attach prefix="풀링크 보너스" hide-details)
				//- template(v-slot:selection="data")
				//-   span(v-bind='data.attrs') {{ data.item }}
				//- template(v-slot:item="data")
				//-   template(v-if="typeof data.item !== 0")
				//-     v-list-item-title(v-text="data.item")
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('enhance', ['SET_LINK_MAX', 'SET_LINK_MIN'])
  },
  computed: {
    ...mapState('enhance', ['linkSlotItem']),
    // 링크 퍼센티지 합산
    ...mapGetters('enhance', ['getTotalLink', 'getCharacterFullLinkBonus']),
    // 링크 슬롯(퍼센티지 합산 해야 함)
    linkSlot1: {
      get() {
        return this.$store.state.enhance.linkSlot1
      },
      set(value) {
        this.$store.commit('enhance/SET_LINK_SLOT1', value)
      }
    },
    linkSlot2: {
      get() {
        return this.$store.state.enhance.linkSlot2
      },
      set(value) {
        this.$store.commit('enhance/SET_LINK_SLOT2', value)
      }
    },
    linkSlot3: {
      get() {
        return this.$store.state.enhance.linkSlot3
      },
      set(value) {
        this.$store.commit('enhance/SET_LINK_SLOT3', value)
      }
    },
    linkSlot4: {
      get() {
        return this.$store.state.enhance.linkSlot4
      },
      set(value) {
        this.$store.commit('enhance/SET_LINK_SLOT4', value)
      }
    },
    linkSlot5: {
      get() {
        return this.$store.state.enhance.linkSlot5
      },
      set(value) {
        this.$store.commit('enhance/SET_LINK_SLOT5', value)
      }
    },
    fullLinkBonus: {
      get() {
        return this.$store.state.enhance.fullLinkBonus
      },
      set(value) {
        this.$store.commit('enhance/SET_FULLLINK_BONUS', value)
      }
    },
    // totalLink 칩 색상
    totalLinkColor() {
      if (this.$store.getters['enhance/getTotalLink'] < 5) return 'red'
      else return 'primary'
    }
  }
}
</script>