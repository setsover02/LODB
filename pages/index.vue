<template lang="pug">
v-row
  v-col(cols="9")
    v-card.radial-t200.pl-1
      //- TODO: Search Config
      v-form(ref="formSearch")
        v-row
          v-col
            //- 검색 필터: 테이블 데이터와 동기화 중
            v-autocomplete(v-model="search" :items="items" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
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
              v-chip(label small v-for="rarity in gradesFilter" :key="rarity") {{ rarity }}
          v-divider(vertical)
          v-col.pl-3(cols="auto")
            //- TODO: 타입 필터
            v-chip-group.pt-1(multiple active-class="accent--text")
              v-chip(label small v-for="type in typeFilter" :key="type") {{ type }}
          v-divider(vertical)
          v-col.pl-3(cols="auto")
            //- TODO: 역힐 필터
            v-chip-group.pt-1(multiple active-class="accent--text")
              v-chip(label small v-for="role in roleFilter" :key="role") {{ role }}

    //- Character Data Table
    v-card.mt-2.radial-t200
      //- TODO: 페이지네이션 없애고 전체row 표기
      v-data-table(v-model="selected" :headers="headers" :items="items" :items-per-page="100" fixed-header :search="search" sort-by="id" single-select show-select hide-default-footer height="430")
        template(v-slot:select)
          v-checkbox(color="orange")
        template(v-slot:item.avatar="{ item }")
          v-avatar(size="32" color="t500")
            v-img(:src="item.avatar")
        template(v-slot:item.rarity="{ item }")
          v-chip(small :color="getRarityColor(item.rarity)") {{ item.rarity }}
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
      v-card.radial-t200
        v-card-text
          v-btn(href="https://app.gitbook.com/@setsover02/s/lodb/" target="blank" color="primary") GitBook  
  v-col(cols="3")
    //- Character Info
    v-card.radial-t200
      v-list-item
        v-list-item-avatar(size="48" color="t500")
          v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
        v-list-item-content
          v-list-item-title Name
          v-list-item-subtitle A • B
        v-list-item-icon
          v-chip(label small color="yellow") SS
      v-divider
      //- Enhance Form
      v-card-title.caption.pb-0 Enh
        span.ml-auto.yellow--text.caption {{ getEnhTotal }}
      v-form.pa-4(ref="formEnh")
        v-row
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
      v-card-title.caption.pb-0 Link
      //- 링크 퍼센티지
      v-card-text
        v-slider(v-model="link" :color="linkColor" thumb-label min="0" max="5" step="0.25" ticks="always")
          template(v-slot:prepend)
            v-icon(@click="linkMin") mdi-minus
          template(v-slot:append)
            v-icon(@click="linkMax") mdi-plus
</template>
<script>
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
    }
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
  data: () => ({
    search: '',
    gradesFilter: ['SS', 'S', 'A', 'B'],
    typeFilter: ['기동형', '경장형', '중장형'],
    roleFilter: ['공격기', '보호기', '지원기'],
    items: char,
    selected: [],
    // 강화 수치 폼
    formEnh: {
      damageEnh: 0, // * 1.5
      healthEnh: 0, // * 3
      defenseEnh: 0, // *
      hitEnh: 0, // * 1.5%
      critEnh: 0, // * 0.4%
      dodgeEnh: 0 // *
    },
    enhPoint: true,
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
      }
    ]
  }),
  methods: {
    // 데이터 테이블 rarity 칩 색상
    getRarityColor(rarity) {
      if (rarity === 'SS') return 'orange'
      else if (rarity === 'S') return 'yellow'
      else if (rarity === 'A') return 'blue'
      else return 'green' // B
    },
    // Link percentage S;ider
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
    // 스탯 잔여포인트 계산
    getEnhTotal() {
        return 270 - // Level * 3
        (parseInt(this.formEnh.damageEnh) +
        parseInt(this.formEnh.healthEnh) +
        parseInt(this.formEnh.defenseEnh) +
        parseInt(this.formEnh.hitEnh) +
        parseInt(this.formEnh.critEnh) +
        parseInt(this.formEnh.dodgeEnh))
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
