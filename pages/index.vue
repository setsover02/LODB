<template lang="pug">
v-row
  v-col
    SearchForm
    DataTable
    v-card.mt-2.radial-t200.flex-grow-1
      v-card-title Calc
  v-col(cols="auto")
    //- Input Form
    //- SimulatingForm(v-if="item.id === selectIDs" v-for="item in character" :key="item.id" :class="selectIDs")
    SimulatingForm
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import SearchForm from '~/components/character/SearchForm'
import DataTable from '~/components/character/DataTable'
import SimulatingForm from '~/components/character/SimulatingForm'
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
export default {
  components: {
    SearchForm,
    DataTable,
    SimulatingForm
  },
  computed: {
    ...mapState({
      selectIDs: state => state.selectIDs
    }),
    ...mapGetters([
      'character' // json
    ])
  }
}
</script>
