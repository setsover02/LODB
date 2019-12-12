<template lang="pug">
  v-app(dark)
    Top
    v-content
      v-container(fluid)
        nuxt
</template>

<script>
import Top from '~/components/default/Top.vue'
export default {
  components: {
    Top,
  }
}
</script>
