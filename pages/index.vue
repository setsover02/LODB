<template lang="pug">
v-row
  v-col(cols="9")
    //- Character Search
    SearchForm
    //- Character Data Table
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
          span {{ Math.floor(item.damage + (formEnh.damageEnh * 1.5)) }}
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
              v-text-field(v-model="props.item.memo" :rules="[max8chars]" counter="8" autofocus)
      v-card.radial-t200
        v-card-text
          v-btn(href="https://app.gitbook.com/@setsover02/s/lodb/" target="blank" color="primary") GitBook  
  v-col(cols="3")
    v-form(ref="formEnh")
      //- Character Info
      v-card.radial-t200
        v-list-item
          v-list-item-avatar(size="48" color="t500")
            v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
          v-list-item-content
            v-list-item-title Name
            v-list-item-subtitle A • B
          v-list-item-content.align-center
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
          v-col(cols="auto").yellow--text.caption {{ getEnhTotal }}
        v-row.px-4.pb-4
          v-col
            label.overline Damage
            v-text-field(v-model="formEnh.damageEnh" 
            dense flat solo hide-details
            type="number" counter maxlength="3" autocomplete="off")
          v-col
            label.overline Health
            v-text-field(label="Health" v-model="formEnh.healthEnh" 
            dense flat solo hide-details
            type="number" counter maxlength="3" autocomplete="off")
          v-col
            label.overline Defense
            v-text-field(label="Defense" v-model="formEnh.defenseEnh" 
            dense flat solo hide-details
            type="number" counter maxlength="3" autocomplete="off")
          v-col
            label.overline Hit
            v-text-field(label="Hit" v-model="formEnh.hitEnh" 
            dense flat solo hide-details
            type="number" counter maxlength="3" autocomplete="off")
          v-col
            label.overline Crit
            v-text-field(label="Crit" v-model="formEnh.critEnh" 
            dense flat solo hide-details
            type="number" counter maxlength="3" autocomplete="off")
          v-col
            label.overline Dodge
            v-text-field(label="Dodge" v-model="formEnh.dodgeEnh" 
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
    Todo
  //- Data Table Memo 관련 스낵바
  v-snackbar.t500--text(v-model="snack" :timeout="3000" :color="snackColor" top right) {{ snackText }}
    v-btn(text @click="snack = false" color="t500") 닫기
</template>
<script>
import SearchForm from '~/components/character/SearchForm'
import RarityChip from '~/components/RarityChip'
import Todo from '~/components/Todo'
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
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
    SearchForm,
    RarityChip,
    Todo
  },
  data: () => ({
    search: '',
    items: char,
    selected: [],
    dummy: [ '1', '2', '3',],
    snack: false,
    snackColor: '',
    snackText: '',
    max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
    rarity: 'SS',
    // 강화 수치 폼
    formEnh: {
      damageEnh: 0, // * 1.5
      healthEnh: 0, // * 3
      defenseEnh: 0, // *
      hitEnh: 0, // * 1.5%
      critEnh: 0, // * 0.4%
      dodgeEnh: 0 // *
    },
    link: 5,
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
    name() {
      this.$store.state.character.name
    },
    // 스탯 잔여포인트 계산
    getEnhTotal() {
      return (
        270 - // = Level * 3
        (parseInt(this.formEnh.damageEnh) +
          parseInt(this.formEnh.healthEnh) +
          parseInt(this.formEnh.defenseEnh) +
          parseInt(this.formEnh.hitEnh) +
          parseInt(this.formEnh.critEnh) +
          parseInt(this.formEnh.dodgeEnh))
      )
    },
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
