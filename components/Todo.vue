<template lang="pug">
v-card
	v-card-title {{ counter }}
</template>
<script>
export default {
	computed: {
		counter() {
			return this.$store.state.stat.counter
		}
	}
}
</script>