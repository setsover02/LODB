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
            v-chip-group.pt-1(multiple active-class="accent--text")
              v-chip(label small v-for="grade in gradesFilter" :key="grade") {{ grade }}
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
    v-card.mt-2
      //- TODO: 페이지네이션 없애고 전체row 표기
      v-data-table(v-model="selected" :headers="headers" :items="items" :items-per-page="100" fixed-header :search="search" sort-by="id" single-select show-select hide-default-footer height="430")
        template(v-slot:select)
          v-checkbox(color="orange")
        template(v-slot:item.avatar="{ item }")
          v-avatar(size="32" color="t500")
            v-img(:src="item.avatar")
        template(v-slot:item.grade="{ item }")
          v-chip(small :color="getGradeColor(item.grade)") {{ item.grade }}
        template(v-slot:item.equip="{ item }")
          //- TODO: For문 돌릴수 있으면
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e1")
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e2")
          v-avatar.mr-1(size="18" tile color="t500")
            v-img(:src="item.equip.e3")
          v-avatar(size="18" tile color="t500")
            v-img(:src="item.equip.e4")

    //- Character Info
    v-card.mt-2
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
  //- 임시
  Terms
</template>
<script>
import Terms from "~/components/Terms";
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
const char = [
  {
    id: "002",
    avatar: require("~/assets/img/avatar/002.png"),
    name: "라비아타 프로토타입",
    grade: "SS",
    type: "중장형",
    role: "공격기",
    atkBase: "54",
    atkCoef: "7.799989433",
    atkFin: "",
    health: "7405",
    damage: "2405",
    hit: "201%",
    equip: {
      e1: "",
      e2: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      e3: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      e4: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    }
  },
  {
    id: "003",
    avatar: require("~/assets/img/avatar/003.png"),
    name: "콘스탄챠 S2",
    grade: "A",
    type: "Light",
    role: "Defender",
    health: "1405",
    damage: "1455",
    hit: "192%",
    equip: ""
  },
  {
    id: "004",
    avatar: require("~/assets/img/avatar/004.png"),
    name: "세라피아스 앨리스",
    grade: "SS",
    type: "Light",
    role: "Defender",
    health: "1405",
    damage: "1455",
    hit: "192%",
    equip: ""
  },
  {
    id: "005",
    avatar: require("~/assets/img/avatar/005.png"),
    name: "바닐라 A1",
    grade: "B",
    type: "Light",
    role: "Defender",
    health: "1405",
    damage: "1455",
    hit: "192%",
    equip: ""
  }
];
export default {
  data: () => ({
    search: "",
    gradesFilter: ["SS", "S", "A", "B"],
    typeFilter: ["기동형", "경장형", "중장형"],
    roleFilter: ["공격기", "보호기", "지원기"],
    items: char,
    selected: [],
    rating: null,
    headers: [
      {
        text: "ID",
        align: "right",
        sortable: true,
        value: "id"
      },
      {
        text: "Img",
        sortable: false,
        value: "avatar"
      },
      {
        text: "Name",
        sortable: true,
        value: "name"
      },
      {
        text: "grade",
        sortable: true,
        value: "grade"
      },
      {
        text: "Type",
        sortable: true,
        value: "type"
      },

      {
        text: "Role",
        sortable: true,
        value: "role"
      },
      {
        text: "atkBase",
        align: "right",
        sortable: false,
        value: "atkBase"
      },
      {
        text: "atkCoef",
        align: "right",
        sortable: false,
        value: "atkCoef"
      },
      {
        text: "atkFin",
        align: "right",
        sortable: false,
        value: "atkFin"
      },
      {
        text: "Health",
        align: "right",
        sortable: true,
        value: "health"
      },
      {
        text: "Damage",
        align: "right",
        sortable: true,
        value: "damage"
      },
      {
        text: "Hit",
        align: "right",
        sortable: true,
        value: "hit"
      },
      {
        text: "Item",
        align: "right",
        sortable: false,
        value: "equip"
      }
    ]
  }),
  methods: {
    // 데이터 테이블 Grade 칩 색상
    getGradeColor(Grade) {
      if (Grade === "SS") return "orange";
      else if (Grade === "S") return "yellow";
      else if (Grade === "A") return "blue";
      else return "green"; // B
    }
  },
  components: {
    Terms
  }
};
</script>
