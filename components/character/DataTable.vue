<template lang="pug">
v-col(cols="9")
  v-card.radial-t200.pl-1
    //- TODO: Search Config
    v-form(ref="formSearch")
      v-row
        v-col
          //- 검색 필터: 테이블 데이터와 동기화 중
          v-autocomplete(v-model="name" :items="items" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
            //- 선택 데이터 표기(삭제시 이름만 출력)
            template(v-slot:selection="data")
              v-chip.white--text(v-bind="data.attrs" :input-value="data.selected")
                v-avatar(left)
                  v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
                | {{ data.item.name }}
            //- 리스트에 아바타 추가
            template(v-slot:item="data")
              template(v-if="typeof data.item !== 'object'")
                v-list-item-content(v-text="data.item")
              template(v-else)
                v-list-item-avatar(size="24")
                  v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
                v-list-item-content
                  v-list-item-title(v-html="data.item.name")

        v-divider(vertical)
        v-col.pl-3(cols="auto")
          //- TODO: 등급 필터
          v-chip-group.pt-1(multiple active-class="accent--text")
            v-chip(label small v-for="rank in rankFilter" :key="rank") {{ rank }}
        v-divider(vertical)
        v-col.pl-3(cols="auto")
          //- TODO: 타입 필터
          v-chip-group.pt-1(multiple active-class="accent--text")
            v-chip(label small v-for="type in typeFilter" :key="type") {{ type }}
        v-divider(vertical)
        v-col.pl-3(cols="auto")
          //- TODO: 역할 필터
          v-chip-group.pt-1(multiple active-class="accent--text")
            v-chip(label small v-for="role in roleFilter" :key="role") {{ role }}

  v-card.mt-2.radial-t200
    //- TODO: 페이지네이션 없애고 전체row 표기
    //- TODO: @click:row = row 선택시 해당 아이템 선택 selected와 동일
    //- TODO: 키값이 아이디(도감번호)로 되어 있는데 이럴 경우 동일한 캐릭터를 여러 row에 저장시키는게 안됨, 검색필터 적용후 삭제 시에도 엉뚱한게 삭제됨
    v-data-table(v-model="selected" :headers="headers" :items="items" item-key="id" hide-default-footer :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event" fixed-header :search="name" sort-by="id" height="450" single-select show-select @click:row="")
      template(v-slot:item.avatar="{ item }")
        v-avatar(size="32" color="t500")
          v-img(:src="require('~/assets/img/avatar/' + item.id + '.png')")
      template(v-slot:item.rank="{ item }")
        RankChip(v-bind:rank="item.rank")
      template(v-slot:item.level="{ item }")
        span {{ level }}
      //- 체력계산
      template(v-slot:item.health="{ item }")
        span {{ Math.floor(item.healthBase + ((level - 1) * item.healthCoef) + healthEnh * 3)}}
      //- 데미지 계산
      template(v-slot:item.damage="{ item }")
        span {{ Math.floor(item.damageBase + ((level - 1) * item.damageCoef) + damageEnh * 1.5) }}
      //- 적중 계산
      template(v-slot:item.hit="{ item }")
        span {{ item.hit + (hitEnh * 1.5) + '%' }}
      //- 치명타 계산 TODO: 소수점 나오는데 도대체 이해가 잘
      template(v-slot:item.crit="{ item }")
        span {{ (item.crit + (critEnh * 0.4)) + (item.linkCrit * totalLink) }}
      //- 회피 계산 TODO: 소수점 나오는데 도대체 이해가 잘
      template(v-slot:item.dodge="{ item }")
        span {{ (item.dodge + (dodgeEnh * 0.4)) + '%'}}
      //- 방어력 계산
      template(v-slot:item.defense="{ item }")
        span {{ Math.floor(item.defenseBase + ((level -1) * item.defenseCoef) + defenseEnh * 3) }}
      template(v-slot:item.equip="{ item }")
        //- TODO: 장착아이템 썸네일 : For문 돌릴수 있으면
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
            v-text-field(v-model="props.item.memo"  counter="8" autofocus)
      //- 삭제 버튼
      template(v-slot:item.actions="{ items }")
        v-btn(@click="deleteItem(item)" icon small)
          v-icon(small) mdi-close
      //- Data Table Memo 관련 스낵바
    //-Data Table Pagination
    v-divider
    v-list-item.py-4
      v-pagination.justify-start(v-model="page" :length="pageCount" total-visible="12")
      v-spacer
      v-text-field(:value="itemsPerPage" type="number" min="10" max="200" @input="itemsPerPage = parseInt($event, 10)" dense solo flat suffix="개 표시" hide-details)
  v-btn.mt-4(large target="blank" href="https://discord.gg/kJJjbP" color="primary")
    v-icon(left) mdi-discord
    | Discord / Vue.js, 웹 개발자를 찾습니다 / 피드백도 환영
    v-snackbar.body-2.t500--text(v-model="snack" :timeout="3000" :color="snackColor") {{ snackText }}
      v-btn(text @click="snack = false" color="t500") 닫기
    //- v-divider
    //- v-card-text 1. 전체 캐릭터 데이터가 나오는 것이 아니라 search폼에서 해당 캐릭터 검색 시 해당 캐릭터 row만 보여줌
    //- v-card-text 2. 우측 패널에서 시뮬레이션 적용 후 저장 시 해당 캐릭터 row에 저장됨 (여러개가 저장될 수 있음)
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import RankChip from '~/components/RankChip'
import character from '~/data/character.json'

export default {
  components: {
    RankChip
  },
  data: () => ({
    items: character, // 테이블 데이터
    selected: [], // 테이블 선택 체크박스
    page: 1, // 페이지 네이션
    pageCount: 0,
    itemsPerPage: 10,
    snack: false,
    snackColor: '',
    snackText: '',
    name: null,
    editedIndex: -1,
    rankFilter: ['SS', 'S', 'A', 'B'],
    typeFilter: ['기동형', '경장형', '중장형'],
    roleFilter: ['공격기', '보호기', '지원기'],
    headers: [
      {
        text: '번호',
        align: 'right',
        sortable: false,
        value: 'id'
      },
      {
        text: '아바타',
        sortable: false,
        value: 'avatar'
      },
      {
        text: '이름',
        sortable: true,
        value: 'name'
      },
      {
        text: '등급',
        align: 'center',
        sortable: false,
        value: 'rank'
      },
      {
        text: '유형',
        sortable: false,
        value: 'type'
      },
      {
        text: '역할',
        sortable: false,
        value: 'role'
      },
      {
        text: '레벨',
        align: 'right',
        sortable: false,
        value: 'level'
      },
      {
        text: '체력',
        align: 'right',
        sortable: true,
        value: 'health'
      },
      {
        // REVIEW: Sorting 기능이 계산식 적용될 경우에도 item 데이터에 맞추어 정렬됨
        text: '공격력',
        align: 'right',
        sortable: true,
        value: 'damage'
      },
      {
        text: '1스킬',
        align: 'right',
        sortable: true,
        value: 'skill1'
      },
      {
        text: '2스킬',
        align: 'right',
        sortable: true,
        value: 'skill2'
      },
      {
        text: '적중',
        align: 'right',
        sortable: true,
        value: 'hit'
      },
      {
        text: '치명',
        align: 'right',
        sortable: true,
        value: 'crit'
      },
      {
        text: '회피',
        align: 'right',
        sortable: true,
        value: 'dodge'
      },
      {
        text: '방어력',
        align: 'right',
        sortable: true,
        value: 'defense'
      },
      {
        text: '행동력',
        align: 'right',
        sortable: true,
        value: 'ap'
      },
      {
        text: '장비',
        align: 'right',
        sortable: false,
        value: 'equip'
      },
      {
        text: '메모',
        align: 'right',
        sortable: false,
        value: 'memo'
      },
      {
        text: '',
        align: 'right',
        sortable: false,
        value: 'actions'
      }
    ]
  }),
  methods: {
    deleteItem(item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.items.splice(index, 1)
    },
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
    }
    // load() {
    //   const character = this
    //   character.data.push(
    //     {
    //       id: i,
    //       damage: Math.floor(this.damageBase + this.$store.state.level)
    //     }
    //   )
    // }
  },
  computed: {
    ...mapState([
      'level', // 레벨
      'damageEnh', // 강화수치
      'defenseEnh',
      'healthEnh',
      'hitEnh',
      'critEnh',
      'dodgeEnh'
    ]),
    ...mapGetters([
      'totalLink'
    ])
  }
}
</script>