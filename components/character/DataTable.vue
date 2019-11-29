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
    v-data-table(v-model="selected" :headers="headers" :items="items" :items-per-page="100" fixed-header :search="name" sort-by="id" single-select show-select hide-default-footer height="430")
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
        v-avatar.mr-1(size="18" tile color="t500")
          v-img(:src="item.equip.e1")
        v-avatar.mr-1(size="18" tile color="t500")
          v-img(:src="item.equip.e2")
        v-avatar.mr-1(size="18" tile color="t500")
          v-img(:src="item.equip.e3")
        v-avatar(size="18" tile color="t500")
          v-img(:src="item.equip.e4")
      //- TODO: Description 수정
      template(v-slot:item.memo="props")
        v-edit-dialog(:return-value.sync="props.item.memo" @save="memoSave" @cancel="memoCancel" @open="memoOpen" @close="memoClose" large persistent)
          span {{ props.item.memo }}
          template(v-slot:input)
            //- :rules="[max8chars]"
            v-text-field(v-model="props.item.memo"  counter="8" autofocus)
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
    hit: '201%',
    crit: '12%',
    dodge: '132%',
    def: '138',
    ap: '4.05',
    equip: {
      e1: '',
      e2: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      e3: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      e4: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    },
    memo: '가나다라마바사'
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
    items: char,
    rarityFilter: ['SS', 'S', 'A', 'B'],
    typeFilter: ['기동형', '경장형', '중장형'],
    roleFilter: ['공격기', '보호기', '지원기'],
    headers: [
      {
        text: 'ID',
        align: 'right',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Img',
        sortable: false,
        value: 'avatar'
      },
      {
        text: 'Name',
        sortable: true,
        value: 'name'
      },
      {
        text: 'rarity',
        sortable: false,
        value: 'rarity'
      },
      {
        text: 'Type',
        sortable: false,
        value: 'type'
      },

      {
        text: 'Role',
        sortable: false,
        value: 'role'
      },
      {
        text: 'level',
        align: 'right',
        sortable: false,
        value: 'level'
      },
      {
        text: 'Health',
        align: 'right',
        sortable: true,
        value: 'health'
      },
      {
        text: 'Damage',
        align: 'right',
        sortable: true,
        value: 'damage'
      },
      {
        text: 'Hit',
        align: 'right',
        sortable: true,
        value: 'hit'
      },
      {
        text: 'Crit',
        align: 'right',
        sortable: true,
        value: 'crit'
      },
      {
        text: 'Dodge',
        align: 'right',
        sortable: true,
        value: 'dodge'
      },
      {
        text: 'Defense',
        align: 'right',
        sortable: true,
        value: 'def'
      },
      {
        text: 'AP',
        align: 'right',
        sortable: true,
        value: 'ap'
      },
      {
        text: 'Item',
        align: 'right',
        sortable: false,
        value: 'equip'
      },
      {
        text: 'memo',
        sortable: false,
        value: 'memo'
      }
    ]
  }),
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
    }
  },
  computed: {
    // REVIEW: 스토어로 옮기고부터 동기화 안됨. 검색필터 수정해야함
    name() {
      return this.$store.state.character.name
    },
    damageEnh() {
      return this.$store.state.simulating.damageEnh
    }
  }
}
</script>