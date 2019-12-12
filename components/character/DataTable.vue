<template lang="pug">
v-card.mt-2.radial-t200
  //- TODO: 페이지네이션 없애고 전체row 표기
  //- TODO: @click:row = row 선택시 해당 아이템 선택 selected와 동일
  //- TODO: 키 값이 아이디(도감번호)로 되어 있는데 이럴 경우 동일한 캐릭터를 여러 row에 저장시키는게 안됨, 검색필터 적용후 삭제 시에도 엉뚱한게 삭제됨
  //- TODO: 동일한 row 재선택시 올바르게 선택이 안됨
  v-data-table(v-model="characterSelect" :headers="charactersCol" :items="character" item-key="id" hide-default-footer :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event" fixed-header :search="characterName" sort-by="id" height="450" single-select show-select @item-selected="itemSelected($event)")
    template(v-slot:item.avatar="{ item }")
      v-avatar(size="32" color="t500")
        v-img(:src="require('~/assets/img/avatar/' + item.id + '.png')")
    template(v-slot:item.rank="{ item }")
      RankChip(v-bind:rank="item.rank")
    template(v-slot:item.level="{ item }")
      span {{ level }}
    //- TODO: 이 이하 계산식 들어간거 싹 다 정리해야함 > 선택된 row에서만 작동되도록 적용 필요
    //- 체력계산 : 소수점 버림인지 검증
    template(v-slot:item.health="{ item }")
      span {{ Math.round((item.healthBase + ((level - 1) * item.healthCoef) + healthEnh * 8) * (1 + item.linkHealth * getTotalLink)) }}
      //- 강화 및 링크로 추가된 체력 (추후 아이템 포함)
      span(v-if="healthEnh > 0").green--text (+{{ Math.round((healthEnh * 8) * (1 + item.linkHealth * getTotalLink)) }})

    //- 데미지 계산
    template(v-slot:item.damage="{ item }")
      span {{ Math.round((item.damageBase + ((level - 1) * item.damageCoef) + damageEnh * 1.5) * (1 + item.linkDamage * getTotalLink)) }}
      //- 강화 및 링크로 추가된 데미지 (추후 아이템 포함)
      span(v-if="damageEnh > 0").green--text (+{{ Math.round((damageEnh * 1.5) * (1 + item.linkDamage * getTotalLink))}})

    //- 적중 계산
    template(v-slot:item.hit="{ item }")
      span {{ (item.hit + (hitEnh * 1.5) + (item.linkHit * getTotalLink)).toFixed(1) + '%' }}
      //- 강화 및 링크로 추가된 적중 (추후 아이템 포함)
      span(v-if="hitEnh > 0 || (item.linkHit * getTotalLink) > 0").green--text (+{{ ((hitEnh * 1.5) + (item.linkHit * getTotalLink)).toFixed(1) + '%' }})

    //- 치명타 계산
    template(v-slot:item.crit="{ item }")
      span {{ ((item.crit + (critEnh * 0.4)) + (item.linkCrit * getTotalLink)).toFixed(1) + '%'}}
      //- 강화 및 링크로 추가된 치명 (추후 아이템 포함)
      span(v-if="critEnh > 0 || (item.linkCrit * getTotalLink) > 0").green--text (+{{ ((critEnh * 0.4) + (item.linkCrit * getTotalLink)).toFixed(1) + '%' }})
      
    //- 회피 계산
    template(v-slot:item.dodge="{ item }")
      span {{ ((item.dodge + (dodgeEnh * 0.4)) + (item.linkDodge * getTotalLink)).toFixed(1) + '%'}}
      //- 강화 및 링크로 추가된 회피 (추후 아이템 포함)
      span(v-if="dodgeEnh > 0 || (item.linkDodge * getTotalLink) > 0").green--text (+{{ ((dodgeEnh * 0.4) + (item.linkDodge * getTotalLink)).toFixed(1) + '%' }})

    //- 방어력 계산
    template(v-slot:item.defense="{ item }")
      span {{ Math.round(((item.defenseBase + ((level - 1 ) * item.defenseCoef)) + defenseEnh * 1.5) * (1 + item.linkDefense * getTotalLink)) }}
      //- 강화 및 링크로 추가된 방어 (추후 아이템 포함)
      span(v-if="defenseEnh > 0 || (item.linkDefense * getTotalLink) > 0").green--text (+{{ Math.round((defenseEnh * 1.5) * (1 + (item.linkDefense * getTotalLink))) }})

    //- AP 계산
    template(v-slot:item.ap="{ item }")
      span {{ (item.ap + (item.linkAP * getTotalLink)).toFixed(3) }}
      //- 강화 및 링크로 추가된 ap (추후 아이템 포함)
      span(v-if="item.linkAP * getTotalLink > 0").green--text (+{{ (item.linkAP * getTotalLink).toFixed(3) }})

    template(v-slot:item.equip="{ item }")
      //- TODO: 장착아이템 썸네일
      v-avatar.mr-1.radius-4(size="24" tile color="t500")
        //- v-img(:src="")
      v-avatar.mr-1.radius-4(size="24" tile color="t500")
        //- v-img(:src="")
      v-avatar.mr-1.radius-4(size="24" tile color="t500")
        //- v-img(:src="")
      v-avatar.radius-4(size="24" tile color="t500")
        //- v-img(:src="")
    //- TODO: Memo 수정, 입력
    template(v-slot:item.memo="props")
      v-edit-dialog(:return-value.sync="props.item.memo" @save="memoSave" @cancel="memoCancel" @open="memoOpen" @close="memoClose" large persistent)
        span {{ props.item.memo }}
        template(v-slot:input)
          //- :rules="[max8chars]"
          v-text-field.mt-4(v-model="props.item.memo" label="Memo" counter="8" autofocus)

    template(v-slot:item.actions="{ items }")
      //- 삭제 버튼
      //- v-btn(@click="deleteItem(item)" icon small)
      //-   v-icon(small) mdi-close
  //-Data Table Pagination
  v-divider
  v-list-item.py-4
    v-pagination.justify-start(v-model="page" :length="pageCount" total-visible="12")
    v-spacer
    v-text-field(:value="itemsPerPage" type="number" min="10" max="200" @input="itemsPerPage = parseInt($event, 10)" dense solo flat suffix="개 표시" hide-details)
  //- Data Table Memo 관련 스낵바
  v-snackbar.body-2.t500--text(v-model="snack" :timeout="3000" :color="snackColor") {{ snackText }}
    v-btn(text @click="snack = false" color="t500") 닫기
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import RankChip from '~/components/RankChip'

export default {
  components: {
    RankChip
  },
  data: () => ({
    page: 1, // 페이지네이션
    pageCount: 0,
    itemsPerPage: 10,
    snack: false,
    snackColor: '',
    snackText: ''
    // rankFilter: ['SS', 'S', 'A', 'B'],
    // typeFilter: ['기동형', '경장형', '중장형'],
    // roleFilter: ['공격기', '보호기', '지원기'],
  }),
  computed: {
    ...mapState([
      'characterName',
      'charactersCol',
      'level', // 레벨
      'damageEnh', // 강화수치
      'defenseEnh',
      'healthEnh',
      'hitEnh',
      'critEnh',
      'dodgeEnh',
      'fullLinkBonus'
    ]),
    ...mapGetters([
      'character', // json
      'finalDamage',
      'getTotalLink',
      'getCharacterDamage'
    ]),
    // 테이블 선택 시 mutations
    characterSelect: {
      get() {
        return this.$store.state.characterSelect
      },
      set(value) {
        this.$store.commit('SET_CHARACTER_SELECT', value)
      }
    }
  },
  methods: {
    // Memo
    memoSave() {
      this.snack = true
      this.snackColor = 'green'
      this.snackText = '저장되었습니다.'
    },
    // 에러메시지로 변경
    memoCancel() {
      this.snack = true
      this.snackColor = 'red'
      this.snackText = '작성이 취소되었습니다.'
    },
    memoOpen() {
      this.snack = false
      this.snackColor = 'lilac'
      this.snackText = 'Dialog opened'
    },
    memoClose() {
      console.log('Dialog closed')
    },
    itemSelected() {
      this.$store.commit('SET_CHARACTER_SELECT', this.$store.state.characterSelect)
      console.log('Select row')
    }
  }
}
</script>