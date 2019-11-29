<template lang="pug">
v-card
	v-card-title {{ counter }}
</template>
<script>
export default {
	methods: {
		
	},
  computed: {
    counter() {
      return this.$store.state.simulating.counter
    }
  }
}
</script>