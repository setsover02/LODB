<template lang="pug">
v-chip(small :color="getRankColor(rank)") {{ rank }}
</template>
<script>
export default {
  props: ['rank'],
  methods: {
    // rank 칩 색상
    getRankColor(rank) {
      if (rank === 'SS') return 'orange'
      else if (rank === 'S') return 'yellow'
      else if (rank === 'A') return 'blue'
      else return 'mint' // B
    }
  }
}
</script>