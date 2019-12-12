<template lang="pug">
  v-app(dark)
    v-card.radial-t200.card-frame.ma-8(shaped elevation="24")
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
<style>
.card-frame {
  height: calc(100vh - 64px);
  width: calc(100vw - 64px);
  overflow: hidden;
  border-radius: 32px 8px !important;
}
.v-content__wrap {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>