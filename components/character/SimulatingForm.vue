<template lang="pug">
//- Character Info
//- Card : 데이터 없을경우
v-card.fill-height.d-flex.flex-column.align-center.justify-center(v-if="getCharacterId === 'undefined'" tile width="470" color="transparent" elevation="0") 
  v-avatar(size="144")
    v-icon(color="t200" size="144") mdi-account-group-outline
    //- v-img(:src="require('~/assets/img/avatar/undefined.png')")
  span.t100--text.headline.font-weight-bold Select Character first
//- Card : DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
v-card.fill-height__vh-n16.overflow-x-hidden.overflow-y-auto(v-else tile width="470" color="transparent" elevation="0")
  v-form(ref="form")
    FormPreview
    //- Enhance Form
    v-row.px-4.py-2(align="center")
      //- TODO: Rank Select, 승급관련 처리 필요
      v-col(cols="4")
        v-select(:items="rank" value="SS" dense small-chips flat hide-details prefix="등급" solo append-icon="mdi-chevron-down")
          template(v-slot:selection="data")
            v-chip(:input-value="data.selected" :color="data.item.color" small) {{ data.item.text }}
          template(v-slot:item="data")
            v-chip(:color="data.item.color" small) {{ data.item.text }}
      //- 레벨 입력 폼
      v-col(cols="4")
        v-text-field(v-model="level" dense flat solo hide-details suffix="레벨"
        type="number" autocomplete="off" min="1" max="90" append-icon="mdi-chevron-double-up" prepend-icon="mdi-chevron-double-down" @click:prepend="level = 1" @click:append="level = 90")
      v-col(cols="auto").pr-0
        v-list(min-width="124" dense color="transparent").py-0
          v-list-item.px-2
            v-switch.mt-0.pt-0(color="primary" hide-details inset)
              template(v-slot:label)
                span.caption 자버프 적용
    v-divider
    //- 이하 강화 포인트 입력 폼
    v-row.px-4.py-2(align="center")
      v-col.subtitle-2 강화
      v-col(cols="auto").primary--text.subtitle-2 잔여포인트
        v-chip.ml-3.white--text(small :color="enhLimitColor" v-text="getEnhLimit")
    v-row.px-4
      v-col(cols="4").text-right
        //- TODO: 현재 캐릭터 스탯 수치 표기(강화 등 아이템 모두 포함)
        v-text-field(v-model="damageEnh"
          dense flat solo hide-details suffix="공격력" append-icon="mdi-chevron-double-up"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        v-text-field(v-model="hitEnh" 
          dense flat solo hide-details suffix="적중" append-icon="mdi-chevron-double-up"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        v-text-field(v-model="critEnh" 
          dense flat solo hide-details suffix="치명" append-icon="mdi-chevron-double-up"
            type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        v-text-field(v-model="healthEnh" 
          dense flat solo hide-details suffix="체력" append-icon="mdi-chevron-double-up"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        v-text-field(v-model="defenseEnh" 
          dense flat solo hide-details suffix="방어력" append-icon="mdi-chevron-double-up"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        v-text-field(v-model="dodgeEnh"
          dense flat solo hide-details suffix="회피" append-icon="mdi-chevron-double-up"
            type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
    v-divider.mt-4

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
    v-row.px-4(align="center")
      //- TODO: 해당 캐릭터 풀링 보너스 선택 : 값이 0 일 경우 표기하지 않는 방법 찾기
      v-col
        v-select(v-model="fullLinkBonus" :items="getCharacterFullLinkBonus" solo flat dense append-icon="mdi-chevron-down" attach prefix="풀링크 보너스" hide-details)
          //- template(v-slot:selection="data")
          //-   span(v-bind='data.attrs') {{ data.item }}
          //- template(v-slot:item="data")
          //-   template(v-if="typeof data.item !== 0")
          //-     v-list-item-title(v-text="data.item")
    v-divider.mt-4
    FormEquipment

</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import RankChip from '~/components/RankChip'
import FormPreview from '~/components/character/form/FormPreview'
import FormEquipment from '~/components/character/form/FormEquipment'
export default {
  components: {
    RankChip,
    FormPreview,
    FormEquipment
  },
  data: () => ({
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
    rank: [
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
    ]
  }),
  methods: {
    ...mapMutations('enhance', ['SET_LINK_MAX', 'SET_LINK_MIN'])
  },
  computed: {
    ...mapState('enhance', [
      'characterSelect',
      'linkSlotItem',
      'fullLinkBonus'
    ]),
    // 잔여 강화 포인트 계산, 링크 퍼센티지 합산
    ...mapGetters('enhance', [
      'getCharacterId',
      'getEnhLimit',
      'getTotalLink',
      'getCharacterFullLinkBonus'
    ]),
    level: {
      get() {
        return this.$store.state.enhance.level
      },
      set(value) {
        this.$store.commit('enhance/SET_LEVEL', value)
      }
    },
    damageEnh: {
      get() {
        return this.$store.state.enhance.damageEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DAMAGE_ENH', value)
      }
    },
    healthEnh: {
      get() {
        return this.$store.state.enhance.healthEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_HEALTH_ENH', value)
      }
    },
    defenseEnh: {
      get() {
        return this.$store.state.enhance.defenseEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DEFENSE_ENH', value)
      }
    },
    hitEnh: {
      get() {
        return this.$store.state.enhance.hitEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_HIT_ENH', value)
      }
    },
    critEnh: {
      get() {
        return this.$store.state.enhance.critEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_CRIT_ENH', value)
      }
    },
    dodgeEnh: {
      get() {
        return this.$store.state.enhance.dodgeEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DODGE_ENH', value)
      }
    },
    // 잔여 강화 포인트 계산
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
    
    // 잔여스탯 색상
    enhLimitColor() {
      if (this.$store.getters['enhance/getEnhLimit'] < 0) return 'red'
      else return 'primary'
    },
    // totalLink 칩 색상
    totalLinkColor() {
      if (this.$store.getters['enhance/getTotalLink'] < 5) return 'red'
      else return 'primary'
    }
  }
}
</script>