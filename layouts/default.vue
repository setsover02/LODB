<template lang="pug">
  v-app(light)
    v-card.dashboard.ma-0.ma-lg-8(shaped)
      Layout
      v-content.fill-height
        v-container(fluid).fill-height.align-start.pa-0
          nuxt
</template>

<script>
import Layout from '~/components/default/Layout.vue'
export default {
  components: {
    Layout
  }
}
</script>