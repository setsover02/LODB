<template lang="pug">
v-row
  v-col(cols="9")
    //- Character Search
    SearchForm
    //- Character Data Table
    DataTable
    v-btn.mt-4(href="https://app.gitbook.com/@setsover02/s/lodb/" target="blank" color="primary") GitBook  
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
</template>
<script>
import SearchForm from '~/components/character/SearchForm'
import DataTable from '~/components/character/DataTable'
import RarityChip from '~/components/RarityChip'
import Todo from '~/components/Todo'
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
export default {
  components: {
    SearchForm,
    DataTable,
    RarityChip,
    Todo
  },
  data: () => ({
    dummy: ['1', '2', '3'],
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
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
  }),
  methods: {
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
