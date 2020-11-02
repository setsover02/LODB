<template lang="pug">
	v-row
		v-col(cols="12")
			Character
</template>
<script>
import Character from "~/components/simulator/character/DataTable";
export default {
  transition: "slide-y-transition",
	components: {
		Character
	}
};
</script>
