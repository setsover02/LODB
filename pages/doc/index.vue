<template lang="pug">
v-row.fill-height
	v-col(cols="2") document
	v-divider(vertical).fill-height
	v-col(cols="8")
		Timeline
</template>
<script>
import Timeline from "~/components/doc/Timeline";
// import Enemy from "~/components/simulator/Enemy";

export default {
	transition: "slide-y-transition",
	components: {
		Timeline,
		// Enemy
	}
};
</script>
