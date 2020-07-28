<template lang="pug">
v-row(no-gutters).fill-height
  v-col.fill-height.d-flex.flex-column.align-center.justify-center
    span.t200--text.display-2.font-weight-bold(v-if="error.statusCode === 404") {{ pageNotFound }}
    span.t200--text.display-2.font-weight-bold(v-else) {{ otherError }}
    div.mt-3
      v-btn(to="/" color="primary") Go to home
      span.ml-2.caption or please refresh
</template>

<script>
export default {
  layout: "empty",
  transition: "scale-transition",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
