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
                  v-img(:src="data.item.avatar")
                | {{ data.item.name }}
            //- 리스트에 아바타 추가
            template(v-slot:item="data")
              template(v-if="typeof data.item !== 'object'")
                v-list-item-content(v-text="data.item")
              template(v-else)
                v-list-item-avatar(size="24")
                  v-img(:src="data.item.avatar")
                v-list-item-content
                  v-list-item-title(v-html="data.item.name")

        v-divider(vertical)
        v-col.pl-3(cols="auto")
          //- TODO: 등급 필터
          v-chip-group.pt-1(multiple active-class="accent--text")
            v-chip(label small v-for="rarity in rarityFilter" :key="rarity") {{ rarity }}
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
    v-data-table(v-model="selected" :headers="headers" :items="items" :key="id" :items-per-page="100" fixed-header :search="name" sort-by="id" single-select show-select hide-default-footer height="430" @click:row="")
      template(v-slot:select)
        v-checkbox(color="orange")
      template(v-slot:item.avatar="{ item }")
        v-avatar(size="32" color="t500")
          v-img(:src="item.avatar")
      template(v-slot:item.rarity="{ item }")
        RarityChip(v-bind:rarity="item.rarity")
      template(v-slot:item.damage="{ item }")
        span {{ item.damage + damageEnh * 1.5 }}
      template(v-slot:item.equip="{ item }")
        //- TODO: 장착아이템 썸네일 : For문 돌릴수 있으면
        v-avatar.mr-1.radius-4(size="24" tile color="t500")
          v-img(:src="item.equip.e1")
        v-avatar.mr-1.radius-4(size="24" tile color="t500")
          v-img(:src="item.equip.e2")
        v-avatar.mr-1.radius-4(size="24" tile color="t500")
          v-img(:src="item.equip.e3")
        v-avatar.radius-4(size="24" tile color="t500")
          v-img(:src="item.equip.e4")
      //- TODO: Description 수정
      template(v-slot:item.memo="props")
        v-edit-dialog(:return-value.sync="props.item.memo" @save="memoSave" @cancel="memoCancel" @open="memoOpen" @close="memoClose" large persistent)
          span {{ props.item.memo }}
          template(v-slot:input)
            //- :rules="[max8chars]"
            v-text-field(v-model="props.item.memo"  counter="8" autofocus)
      template(v-slot:item.actions="{ items }")
        v-btn(@click="deleteItem(item)" icon small)
          v-icon(small) mdi-close
      //- Data Table Memo 관련 스낵바
    v-snackbar.t500--text(v-model="snack" :timeout="3000" :color="snackColor" top right) {{ snackText }}
      v-btn(text @click="snack = false" color="t500") 닫기
    //- v-divider
    //- v-card-text 1. 전체 캐릭터 데이터가 나오는 것이 아니라 search폼에서 해당 캐릭터 검색 시 해당 캐릭터 row만 보여줌
    //- v-card-text 2. 우측 패널에서 시뮬레이션 적용 후 저장 시 해당 캐릭터 row에 저장됨 (여러개가 저장될 수 있음)
</template>
<script>
import RarityChip from '~/components/RarityChip'
const char = [
  {
    id: '002',
    avatar: require('~/assets/img/avatar/002.png'),
    name: '라비아타 프로토타입',
    rarity: 'SS',
    type: '중장형',
    role: '공격기',
    level: '90',
    health: 7405,
    damage: 2405,
    skill1: '3452',
    skill2: '3452',
    hit: '201%',
    crit: '12%',
    dodge: '132%',
    def: '138',
    ap: '4.05',
    equip: {
      e1: '',
      e2: require('~/assets/img/items/414.png'),
      e3: require('~/assets/img/items/414.png'),
      e4: require('~/assets/img/items/414.png'),
    },
    memo: '기본',
    actions: ''
  },
  {
    id: '003',
    avatar: require('~/assets/img/avatar/003.png'),
    name: '콘스탄챠 S2',
    rarity: 'A',
    type: 'Light',
    role: 'Defender',
    health: 1405,
    damage: 1455,
    hit: '192%',
    equip: ''
  },
  {
    id: '004',
    avatar: require('~/assets/img/avatar/004.png'),
    name: '세라피아스 앨리스',
    rarity: 'SS',
    type: 'Light',
    role: 'Defender',
    health: 1405,
    damage: 1455,
    hit: '192%',
    equip: ''
  },
  {
    id: '005',
    avatar: require('~/assets/img/avatar/005.png'),
    name: '바닐라 A1',
    rarity: 'B',
    type: 'Light',
    role: 'Defender',
    health: 1405,
    damage: 1455,
    hit: '192%',
    equip: ''
  }
]
export default {
  components: {
    RarityChip
  },
  data: () => ({
    items: char,
    selected: [],
    snack: false,
    snackColor: '',
    snackText: '',
    name: null,
    editedIndex: -1,
    rarityFilter: ['SS', 'S', 'A', 'B'],
    typeFilter: ['기동형', '경장형', '중장형'],
    roleFilter: ['공격기', '보호기', '지원기'],
    headers: [
      {
        text: '번호',
        align: 'right',
        sortable: true,
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
        sortable: false,
        value: 'rarity'
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
        value: 'def'
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
  },
  computed: {
    damageEnh() {
      return this.$store.state.damageEnh
    }
  }
}
</script>