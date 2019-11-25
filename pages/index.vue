<template lang="pug">
v-row
  v-col(cols="8")
    v-card
      //- TODO: Search Config
      v-form(ref="form")
        v-row
          v-col
            v-text-field(v-model="search" label="Search" dense prepend-inner-icon="mdi-magnify"
            hide-details color="orange" solo flat)
          v-divider(vertical)  
          v-col(cols="auto")
            //- TODO: 등급 필터
            v-chip-group(multiple column active-class="yellow--text")
              v-chip(small tile) SS
              v-chip(small tile) S
              v-chip(small tile) A
              v-chip(small tile) B
          v-divider(vertical)
          v-col(cols="auto")
            //- TODO: 타입 필터
            v-chip-group(multiple column active-class="yellow--text")
              v-chip(small tile) 1234
              v-chip(small tile) 54
              v-chip(small tile) 12123
          v-divider(vertical)
          v-col(cols="auto")
            //- TODO: 역힐 필터
            v-chip-group(multiple column)
              v-chip(active-class="yellow--text" small tile) 1234
              v-chip(active-class="orange--text" small tile) 54
              v-chip(small tile) 12123

    //- Character Data Table
    v-card.mt-2
      //- TODO: 페이지네이션 없애고 전체row 표기
      v-data-table(v-model="selected" :headers="headers" :items="items" :items-per-page="100" fixed-header :search="search" sort-by="id" single-select show-select hide-default-footer height="650")
        template(v-slot:select)
          v-checkbox(color="orange")
        template(v-slot:item.avatar="{ item }")
          v-avatar(size="32" color="grey darken-4")
            v-img(:src="item.avatar")
        template(v-slot:item.class="{ item }")
          v-chip(small :color="getClassColor(item.class)") {{ item.class }}

  v-col(cols="4")
    //- Character Info
    v-card
      v-list-item
        v-list-item-avatar(size="48" color="grey darken-3")
          v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
        v-list-item-content
          v-list-item-title Name
          v-list-item-subtitle A • B
        v-row
          v-chip(small) SS
      v-divider
      v-row
        v-col
          v-list.py-0(dense)
            v-list-item
              v-list-item-title Damage
              v-list-item-subtitle.text-right 2870
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
        v-rating(v-model="rating" @input="" color="orange lighten-4" 
        full-icon="mdi-link-variant" empty-icon="mdi-link-variant-off"
        clearable background-color="grey darken-4")
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
    health: '7,405',
    damage: '2,405',
    hit: '201%'
  },
  {
    id: '002',
    avatar: '',
    name: 'Karl Johnson',
    class: 'S',
    type: 'Light',
    role: 'Defender',
    health: '1,405',
    damage: '1,455',
    hit: '192%'
  },
]
export default {
  data: () => ({
    search: '',
    items: char,
    selected: [],
    expanded: [],
    rating: '',
    headers: [
      {
        text: 'ID',
        align: 'right',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Img',
        sortable: true,
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
        sortable: false,
        value: 'hit'
      },
      {
        text: '',
        value: 'data-table-expand'
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