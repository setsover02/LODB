<template lang="pug">
v-row.fill-height
	v-col.pa-0(cols="12" lg="8")
		Character
	v-divider(vertical).fill-height
	v-col
		Enemy
</template>
<script>
import Character from "~/components/simulator/Character";
import Enemy from "~/components/simulator/Enemy";

export default {
	transition: "slide-y-transition",
	components: {
		Character,
		Enemy
	}
};
</script>
