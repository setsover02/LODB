<template lang="pug">
v-row.fill-height(no-gutters)
  v-col.fill-height.removed-max-width.py-0
    FormSelect
    v-divider
    DataTable
  v-divider(vertical).fill-height
  v-col(cols="auto")
    SimulatingForm
</template>
<style scoped>
.removed-max-width {
  max-width: calc(100% - 471px);
}
</style>
<script>
import FormSelect from "~/components/simulator/character/FormSelect";
import DataTable from "~/components/character/DataTable";
import SimulatingForm from "~/components/character/SimulatingFormElder";
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
export default {
  transition: "slide-y-transition",
  components: {
    FormSelect,
    DataTable,
    SimulatingForm
  }
};
</script>
