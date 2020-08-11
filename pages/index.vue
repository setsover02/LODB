<template lang="pug">
v-row.fill-height
	v-col(cols="12" lg="8")
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
