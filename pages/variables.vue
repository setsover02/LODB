<template lang="pug">
  v-row
    v-col(cols="3")
      v-card
        v-card-title Basic info data list
        ul.px-8.pb-4
          li.caption(v-for="item in stat" :key="name")
            kbd.mr-2 {{ item.name }}
            | {{ item.desc }}
</template>
<script>
export default {
  data: () => ({
    stat: [
      {
        name: 'ID',
        desc: '가낟다라마바사'
      },
      {
        name: 'Name',
        desc: 'HyperText Markup Language'
      },
      {
        name: 'Class',
        desc: 'HyperText Markup Language'
      },
      {
        name: 'Type',
        desc: 'HyperText Markup Language'
      },
      {
        name: 'Role',
        desc: 'HyperText Markup Language'
      },
      {
        name: 'Health',
        desc: 'HyperText Markup Language'
      },
      {
        name: 'Defense',
        desc: 'HyperText Markup Language'
      }
    ]
  })
}
</script>