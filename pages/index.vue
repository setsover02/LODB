<template lang="pug">
v-row.fill-height(no-gutters)
	v-col(cols="auto")
		v-sheet(width="480" color="transparent")
			FormSelect
			v-divider
			SimulatingForm
	v-divider(vertical).fill-height
</template>
<script>
import FormSelect from "~/components/simulator/FormSelect";
import SimulatingForm from "~/components/character/SimulatingForm";

export default {
	transition: "slide-y-transition",
	components: {
		FormSelect,
		SimulatingForm
	}
};
</script>
