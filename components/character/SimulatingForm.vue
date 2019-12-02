<template lang="pug">
//- Character Info
v-card.radial-t200
  v-form(ref="form")
    v-list-item.py-2
      v-list-item-avatar.radius-4(size="48" color="t500")
        v-img(:src="require('~/assets/img/avatar/002.png')")
      v-list-item-content
        v-list-item-title 라비아타 프로토타입
        v-list-item-subtitle Type • Role
      v-list-item-action
        v-btn(text color="primary") 초기화
      v-list-item-action
        v-btn(color="primary") 저장
    v-divider
    //- Enhance Form
    v-row.px-4.py-2(align="center")
      v-col(cols="4")
        v-select(:items="rarity" value="SS" dense small-chips flat hide-details prefix="등급" solo append-icon="mdi-chevron-down")
          template(v-slot:selection="data")
            v-chip(:input-value="data.selected" :color="data.item.color" small) {{ data.item.text }}
          template(v-slot:item="data")
            v-chip(:color="data.item.color" small) {{ data.item.text }}
      v-col(cols="4")
        v-text-field(v-model="level" dense flat solo hide-details suffix="레벨"
        type="number" autocomplete="off")
      v-col(cols="4").px-4
        v-switch.mt-0.pt-0(color="accent" hide-details)
          template(v-slot:label)
            span.overline 자버프 적용
    v-divider
    v-row.px-4.py-2(align="center")
      v-col.subtitle-2 강화
      v-col(cols="auto").primary--text.subtitle-2 잔여포인트
        v-chip.ml-3.white--text(small color='primary') {{ enhTotalLimit }}
    //- 강화 수치
    v-row.px-4.pb-4
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="damageEnh"
            dense flat solo hide-details suffix="공격력"
            type="number" counter maxlength="3" autocomplete="off")
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="healthEnh" 
            dense flat solo hide-details suffix="체력"
            type="number" counter maxlength="3" autocomplete="off")
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="defenseEnh" 
            dense flat solo hide-details suffix="방어력"
            type="number" counter maxlength="3" autocomplete="off")
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="hitEnh" 
            dense flat solo hide-details suffix="적중"
            type="number" counter maxlength="3" autocomplete="off")
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="critEnh" 
          dense flat solo hide-details suffix="치명"
            type="number" counter maxlength="3" autocomplete="off")
      v-col(cols="4").text-right
        span.pr-4.caption.accent--text 102%
        v-text-field(v-model="dodgeEnh" 
          dense flat solo hide-details suffix="회피"
            type="number" counter maxlength="3" autocomplete="off")
    v-divider
    //- 링크 퍼센티지
    v-row.px-4.py-2(align="center")
      v-col.subtitle-2 링크
      v-col(cols="auto").primary--text.subtitle-2 링크 퍼센티지
        v-chip.ml-3.white--text(small color='primary') 500%
      v-col(cols="auto")
        v-btn(small text color="primary") Max
    //- TODO: select 5개 모두 값이 있을 경우 풀링 보너스 선택
    v-row.px-4
      v-col
        v-select(:items="dummy" solo flat dense append-icon="" suffix="%" hide-details)
      v-col
        v-select(:items="dummy" solo flat dense append-icon="" suffix="%" hide-details)
      v-col
        v-select(:items="dummy" solo flat dense append-icon="" suffix="%" hide-details)
      v-col
        v-select(:items="dummy" solo flat dense append-icon="" suffix="%" hide-details)
      v-col
        v-select(:items="dummy" solo flat dense append-icon="" suffix="%" hide-details)
    v-row.pa-4(align="center")
      v-col
        v-select(:items="dummy" solo flat dense append-icon="mdi-chevron-down" prefix="풀링크 보너스" hide-details)
    v-divider
    v-row.px-4.py-2
      v-col(cols="12").subtitle-2 아이템
      v-col(cols="6")
        v-select(:items="dummy" dense solo flat prefix="칩" append-icon="mdi-chevron-down")
      v-col(cols="6")
        v-select(:items="dummy" dense solo flat prefix="칩" append-icon="mdi-chevron-down")
      v-col(cols="6")
        v-select(:items="dummy" dense solo flat prefix="OS" append-icon="mdi-chevron-down")
      v-col(cols="6")
        v-select(:items="dummy" dense solo flat prefix="장비" append-icon="mdi-chevron-down")
    v-divider
    v-row.px-4.py-2
      v-col(cols="12").subtitle-2 기타 능력치
      v-col(cols="4")
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 행동력
            v-list-item-subtitle 4.01
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 방어 관통
            v-list-item-subtitle 67%
      v-col(cols="4")
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 효과 저항
            v-list-item-subtitle 50%
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 전기 저항
            v-list-item-subtitle 67%
      v-col(cols="4")
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 효과 저항
            v-list-item-subtitle 50%
        v-list-item.px-0
          v-list-item-content
            v-list-item-title.body-1 전기 저항
            v-list-item-subtitle 67%
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import RarityChip from '~/components/RarityChip'
export default {
  components: {
    RarityChip
  },
  data: () => ({
    dummy: ['1', '2', '3'],
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
    // rarity: 'SS',
    rarity: [
      {
        text: 'SS',
        color: 'orange'
      },
      {
        text: 'S',
        color: 'yellow'
      },
      {
        text: 'A',
        color: 'blue'
      },
      {
        text: 'B',
        color: 'green'
      }
    ],
  }),
  methods: {
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
    level: {
      get() {
        return this.$store.state.level
      },
      set(value) {
        this.$store.commit('updateLevel', value)
      }
    },
    damageEnh: {
      get() {
        return this.$store.state.damageEnh
      },
      set(value) {
        this.$store.commit('updateDamageEnh', value)
      }
    },
    healthEnh: {
      get() {
        return this.$store.state.healthEnh
      },
      set(value) {
        this.$store.commit('updateHealthEnh', value)
      }
    },
    defenseEnh: {
      get() {
        return this.$store.state.defenseEnh
      },
      set(value) {
        this.$store.commit('updateDefenseEnh', value)
      }
    },
    hitEnh: {
      get() {
        return this.$store.state.hitEnh
      },
      set(value) {
        this.$store.commit('updateHitEnh', value)
      }
    },
    critEnh: {
      get() {
        return this.$store.state.critEnh
      },
      set(value) {
        this.$store.commit('updateCritEnh', value)
      }
    },
    dodgeEnh: {
      get() {
        return this.$store.state.dodgeEnh
      },
      set(value) {
        this.$store.commit('updateDodgeEnh', value)
      }
    },
    enhTotalLimit() {
      return this.$store.getters.enhTotalLimit
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
  }
}
</script>