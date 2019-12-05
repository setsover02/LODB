<template lang="pug">
v-row
  v-col
    SearchForm
    DataTable
    v-btn.mt-4(large target="blank" href="https://discord.gg/kJJjbP" color="primary")
      v-icon(left) mdi-discord
      | Discord / Vue.js, 웹 개발자를 찾습니다 / 조언도 환영
  v-col(cols="auto")
    //- Input Form
    SimulatingForm
    Todo
</template>
<script>
import SearchForm from '~/components/character/SearchForm'
import DataTable from '~/components/character/DataTable'
import SimulatingForm from '~/components/character/SimulatingForm'
import Todo from '~/components/Todo'
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
export default {
  components: {
    SearchForm,
    DataTable,
    SimulatingForm,
    Todo
  }
}
</script>
