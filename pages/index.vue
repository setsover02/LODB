<template lang="pug">
v-row.fill-height(no-gutters)
  v-col(cols="4").fill-height.py-0
    div(v-for="article in articles" :keys="article")
      h2 {{ article.name }}
      p {{ article.rank }}
  v-divider(vertical).fill-height
</template>
<script>
const axios = require('axios')
const _ = require('lodash')
const url = 'https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/dataHeroes!A1:D1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To'
// https://docs.google.com/spreadsheets/d/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/edit?usp=sharing
// vuetify 데이터 테이블 계산식 적용 예시
// https://stackoverflow.com/questions/57170568/how-to-update-v-data-table-data-in-real-time
// {{ Math.floor( value.atkbase + value.atkcoef * (level - 1) + atkEnh * 1.5 ) }}
export default {
  transition: "slide-y-transition",
  async asyncData () {
    const response = await axios.get(url)
    const rows = response.data.values
    const properties = rows.shift()
    const articles = []
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]))
    }
    return { articles }
  }
};
</script>
