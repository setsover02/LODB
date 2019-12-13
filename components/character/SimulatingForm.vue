<template lang="pug">
//- Character Info
//- TODO: DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
v-card.fill-height.d-flex.flex-column.align-center.justify-center(v-if="getCharacterId === 'undefined'" width="470" color="transparent" elevation="0") 
  v-avatar(size="144")
    v-img(:src="require('~/assets/img/avatar/undefined.png')")
  span.overline Select character first
v-card.fill-height(v-else width="470" color="transparent" elevation="0")
  v-form(ref="form")
    v-list-item.py-2
      v-list-item-avatar.radius-4(size="48" color="t500")
        v-img(:src="require('~/assets/img/avatar/' + getCharacterId + '.png')" :lazy-src="require('~/assets/img/avatar/undefined.png')")
      v-list-item-content
        v-list-item-title.title(v-text="getCharacterName")
        v-list-item-subtitle {{ getCharacterType }} • {{ getCharacterRole }}
      //- TODO: 초기화 시 하단 폼에 입력한 내용 전체 초기화(우선순위 낮음)
      v-list-item-action
        v-btn(text color="primary" disabled) 초기화
      //- TODO: 저장 시 해당 폼의 정보가 DataTable에 추가되어야 함  
      v-list-item-action
        v-btn(color="primary" disabled) 저장
    v-divider
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

      //- TODO: 조건 여부랑 관계없이 본인에게 적용될 수 있는 버프 적용
      v-col(cols="4").px-4
        v-switch.mt-0.pt-0(color="accent" hide-details)
          template(v-slot:label)
            span.overline 자버프 적용

    v-divider

    //- 이하 강화 포인트 입력 폼
    v-row.px-4.py-2(align="center")
      v-col.subtitle-2 강화
      v-col(cols="auto").primary--text.subtitle-2 잔여포인트
        v-chip.ml-3.white--text(small color='primary' v-text="getEnhLimit")
    //- 강화 수치
    v-row.px-4.pb-4
      v-col(cols="4").text-right
        //- TODO: 현재 캐릭터 스탯 수치 표기(강화 등 아이템 모두 포함)
        span.pr-2.body-2.accent--text(v-text="getCharacterDamage")
        v-text-field(v-model="damageEnh"
          dense flat solo hide-details suffix="공격력"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        span.pr-2.body-2.accent--text(v-text="getCharacterHealth")
        v-text-field(v-model="healthEnh" 
          dense flat solo hide-details suffix="체력"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        span.pr-2.body-2.accent--text(v-text="getCharacterDefense")
        v-text-field(v-model="defenseEnh" 
          dense flat solo hide-details suffix="방어력"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        span.pr-2.body-2.accent--text(v-text="getCharacterHit + '%'")
        v-text-field(v-model="hitEnh" 
          dense flat solo hide-details suffix="적중"
          type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        span.pr-2.body-2.accent--text(v-text="getCharacterCrit + '%'")
        v-text-field(v-model="critEnh" 
          dense flat solo hide-details suffix="치명"
            type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
      v-col(cols="4").text-right
        span.pr-2.body-2.accent--text(v-text="getCharacterDodge + '%'")
        v-text-field(v-model="dodgeEnh"
          dense flat solo hide-details suffix="회피"
            type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
    v-divider
    //- 링크 퍼센티지
    v-row.px-4.py-2(align="center")
      v-col.subtitle-2 링크
      v-col(cols="auto").primary--text.subtitle-2 링크 퍼센티지
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
    v-row.pa-4(align="center")
      //- TODO: 해당 캐릭터 풀링 보너스 선택
      v-col
        v-select(v-model="fullLinkBonus" :items="getCharacterFullLinkBonus" solo flat dense append-icon="mdi-chevron-down" prefix="풀링크 보너스" hide-details) 
        span value : {{ fullLinkBonus }}
    v-divider
    v-row.px-4.py-2(no-gutter)
      v-col(cols="12").subtitle-2 아이템
      v-col(cols="6")
        v-autocomplete(v-model="equipmentSelect" :items="equipment" item-text="name" item-value="id" dense solo flat prefix="칩" append-icon="mdi-chevron-down" autocomplete="off")
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
      v-col(cols="6")
        v-autocomplete(v-model="equipmentSelect" :items="equipment" item-text="name" item-value="id" dense solo flat prefix="칩" append-icon="mdi-chevron-down" autocomplete="off")
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

      v-col(cols="6")
        v-autocomplete(:items="equipment" dense solo flat prefix="OS" append-icon="mdi-chevron-down" autocomplete="off")
      v-col(cols="6")
        v-autocomplete(:items="equipment" dense solo flat prefix="장비" append-icon="mdi-chevron-down" autocomplete="off")
    v-divider
    v-row.px-4.py-2
      v-col(cols="12").subtitle-2 기타 능력치
      v-col(cols="4")
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-subtitle 행동력
          v-list-item-content.caption 4.01
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 방어 관통
          v-list-item-content.caption 67%
      v-col(cols="4")
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 효과 저항
          v-list-item-content.caption 50%
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 피해 감소
          v-list-item-content.caption 50%
      v-col(cols="4")
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 전기 저항
          v-list-item-content.caption 67%
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 화염 저항
          v-list-item-content.caption 50%
        v-list-item.px-0(dense)
          v-list-item-content.py-0
            v-list-item-title.body-1 냉기 저항
          v-list-item-content.caption 67%
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import RankChip from '~/components/RankChip'
export default {
  components: {
    RankChip
  },
  // props: {
  //   characterID: {
  //     type: String,
  //     required: true,
  //   }
  // },
  data: () => ({
    equipmentSelect: null,
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
    ...mapMutations(['SET_LINK_MAX', 'SET_LINK_MIN'])
  },
  computed: {
    ...mapState(['characterSelect', 'linkSlotItem', 'fullLinkBonus']),
    // 잔여 강화 포인트 계산, 링크 퍼센티지 합산
    ...mapGetters([
      'getTotalLink',
      'getCharacterId',
      'getCharacterName',
      'getCharacterType',
      'getCharacterRole',
      'getCharacterDamage',
      'getCharacterHealth',
      'getCharacterDefense',
      'getCharacterHit',
      'getCharacterCrit',
      'getCharacterDodge',
      'getEnhLimit',
      'getCharacterFullLinkBonus',
      'equipment'
    ]),
    level: {
      get() {
        return this.$store.state.level
      },
      set(value) {
        this.$store.commit('SET_LEVEL', value)
      }
    },
    damageEnh: {
      get() {
        return this.$store.state.damageEnh
      },
      set(value) {
        this.$store.commit('SET_DAMAGE_ENH', value)
      }
    },
    healthEnh: {
      get() {
        return this.$store.state.healthEnh
      },
      set(value) {
        this.$store.commit('SET_HEALTH_ENH', value)
      }
    },
    defenseEnh: {
      get() {
        return this.$store.state.defenseEnh
      },
      set(value) {
        this.$store.commit('SET_DEFENSE_ENH', value)
      }
    },
    hitEnh: {
      get() {
        return this.$store.state.hitEnh
      },
      set(value) {
        this.$store.commit('SET_HIT_ENH', value)
      }
    },
    critEnh: {
      get() {
        return this.$store.state.critEnh
      },
      set(value) {
        this.$store.commit('SET_CRIT_ENH', value)
      }
    },
    dodgeEnh: {
      get() {
        return this.$store.state.dodgeEnh
      },
      set(value) {
        this.$store.commit('SET_DODGE_ENH', value)
      }
    },
    // 잔여 강화 포인트 계산
    // 링크 슬롯(퍼센티지 합산 해야 함)
    linkSlot1: {
      get() {
        return this.$store.state.linkSlot1
      },
      set(value) {
        this.$store.commit('SET_LINK_SLOT1', value)
      }
    },
    linkSlot2: {
      get() {
        return this.$store.state.linkSlot2
      },
      set(value) {
        this.$store.commit('SET_LINK_SLOT2', value)
      }
    },
    linkSlot3: {
      get() {
        return this.$store.state.linkSlot3
      },
      set(value) {
        this.$store.commit('SET_LINK_SLOT3', value)
      }
    },
    linkSlot4: {
      get() {
        return this.$store.state.linkSlot4
      },
      set(value) {
        this.$store.commit('SET_LINK_SLOT4', value)
      }
    },
    linkSlot5: {
      get() {
        return this.$store.state.linkSlot5
      },
      set(value) {
        this.$store.commit('SET_LINK_SLOT5', value)
      }
    },
    fullLinkBonus: {
      get() {
        return this.$store.state.fullLinkBonus
      },
      set(value) {
        this.$store.commit('SET_FULLLINK_BONUS', value)
      }
    },
    // totalLink 칩 색상
    totalLinkColor() {
      if (this.$store.getters.getTotalLink < 5) return 'red'
      return 'primary'
    }
  }
}
</script>