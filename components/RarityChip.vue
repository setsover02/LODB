<template lang="pug">
v-chip(small :color="getRarityColor(rarity)") {{ rarity }}
</template>
<script>
export default {
  props: ['rarity'],
  methods: {
    // rarity 칩 색상
    getRarityColor(rarity) {
      if (rarity === 'SS') return 'orange'
      else if (rarity === 'S') return 'yellow'
      else if (rarity === 'A') return 'blue'
      else return 'green' // B
    }
  }
}
</script>