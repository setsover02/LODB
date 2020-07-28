<template lang="pug">
v-row.fill-height(no-gutters)
	v-col(cols="auto")
		Character
	v-divider(vertical).fill-height
</template>
<script>
import Character from "~/components/simulator/Character";

export default {
	transition: "slide-y-transition",
	components: {
		Character
	}
};
</script>
