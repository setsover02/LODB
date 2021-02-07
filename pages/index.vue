<template lang="pug">
v-row.fill-height
	v-col.pa-0(cols="auto")
		Character
	v-divider(vertical).fill-height
	v-col
		Result
</template>
<script>
import Character from "~/components/simulator/Character";
import Result from "~/components/simulator/Result";

export default {
	transition: "slide-y-transition",
	components: {
		Character,
		Result
	}
};
</script>
