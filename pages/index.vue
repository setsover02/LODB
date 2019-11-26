<template lang="pug">
v-row
  v-col(cols="8")
    v-card
      //- TODO: Search Config
      v-form(ref="form")
        v-row
          v-col
            //- 검색 필터: 테이블 데이터와 동기화 중
            v-autocomplete(v-model="search" :items="items" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" solo flat)
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
            v-chip-group.pt-1(multiple)
              v-chip(label small active-class="orange--text") SS
              v-chip(label small active-class="yellow--text") S
              v-chip(label small active-class="blue--text") A
              v-chip(label small active-class="green--text") B
          v-divider(vertical)
          v-col.pl-3(cols="auto")
            //- TODO: 타입 필터
            v-chip-group.pt-1(multiple active-class="accent--text")
              v-chip(label small) 1234
              v-chip(label small) 54
              v-chip(label small) 12123
          v-divider(vertical)
          v-col.pl-3(cols="auto")
            //- TODO: 역힐 필터
            v-chip-group.pt-1(multiple active-class="accent--text")
              v-chip(label small) 1234
              v-chip(label small) 54
              v-chip(label small) 12123

    //- Character Data Table
    v-card.mt-2
      //- TODO: 페이지네이션 없애고 전체row 표기
      v-data-table(v-model="selected" :headers="headers" :items="items" :items-per-page="100" fixed-header :search="search" sort-by="id" single-select show-select hide-default-footer height="650")
        template(v-slot:select)
          v-checkbox(color="orange")
        template(v-slot:item.avatar="{ item }")
          v-avatar(size="32" color="t500")
            v-img(:src="item.avatar")
        template(v-slot:item.class="{ item }")
          v-chip(label small :color="getClassColor(item.class)") {{ item.class }}
        template(v-slot:item.equip="{ item }")
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e1")
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e2")
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e3")
          v-avatar(size="18" tile color="t500")
            v-img(:src="item.equip.e4")
          //- v-avatar(size="16" tile v-for="item in item.equip")
          //-   span {{ equip }}
            //- v-img(:src="item.equip")
  v-col(cols="4")
    //- Character Info
    v-card
      v-list-item
        v-list-item-avatar(size="48" color="t500")
          v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
        v-list-item-content
          v-list-item-title Name
          v-list-item-subtitle A • B
        v-row
          v-chip(label small color="yellow") SS
      v-divider
      v-row
        v-col
          v-list.py-0(dense)
            v-list-item
              v-list-item-title Damage
              v-list-item-subtitle.text-right 1242
                v-chip.ml-1.px-1(x-small color="mint") 23
                  v-icon.mx-0(small right) mdi-arrow-up
            v-list-item
              v-list-item-title Crit
              v-list-item-subtitle.text-right 205%
            v-list-item
              v-list-item-title Hit
              v-list-item-subtitle.text-right 205%
        v-divider(vertical)
        v-col
          v-list.py-0(dense)
            v-list-item
              v-list-item-title Hit
              v-list-item-subtitle.text-right 205%
            v-list-item
              v-list-item-title Hit
              v-list-item-subtitle.text-right 205%
        v-divider(vertical)
        v-col
          v-list.py-0(dense)
            v-list-item
              v-list-item-title Hit
              v-list-item-subtitle.text-right 205%
            v-list-item
              v-list-item-title Hit
              v-list-item-subtitle.text-right 205%
    //- Calculating Form
    v-card.mt-2
      v-card-text
        label Link
        v-rating(v-model="rating" color="accent" 
        full-icon="mdi-link-variant" empty-icon="mdi-link-variant-off"
        clearable background-color="t100")
        span.overline (rating * 100%)
</template>
<script>
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
const char = [
  {
    id: '001',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    name: 'Lois Suarez',
    class: 'S',
    type: 'Medium',
    role: 'Defender',
    health: '7405',
    damage: '2405',
    hit: '201%',
    equip: {
      e1: '',
      e2: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      e3: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      e4: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    }
  },
  {
    id: '002',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    name: 'Karl Johnson',
    class: 'A',
    type: 'Light',
    role: 'Defender',
    health: '1405',
    damage: '1455',
    hit: '192%',
    equip: ''
  },
  {
    id: '003',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    name: 'Aaron Iker',
    class: 'SS',
    type: 'Light',
    role: 'Defender',
    health: '1405',
    damage: '1455',
    hit: '192%',
    equip: ''
  },
  {
    id: '004',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    name: 'Glen Hansard',
    class: 'B',
    type: 'Light',
    role: 'Defender',
    health: '1405',
    damage: '1455',
    hit: '192%',
    equip: ''
  }
]
export default {
  data: () => ({
    search: '',
    items: char,
    selected: [],
    expanded: [],
    rating: null,
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
        text: 'Class',
        sortable: true,
        value: 'class'
      },
      {
        text: 'Type',
        sortable: true,
        value: 'type'
      },
      {
        text: 'Role',
        sortable: true,
        value: 'role'
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
        text: 'Item',
        align: 'right',
        sortable: false,
        value: 'equip'
      }
    ]
  }),
  methods: {
    // 데이터 테이블 class 칩 색상
    getClassColor(Class) {
      if (Class === 'SS') return 'orange'
      else if (Class === 'S') return 'yellow'
      else if (Class === 'A') return 'blue'
      else return 'green' // B
    }
  }
}
</script>