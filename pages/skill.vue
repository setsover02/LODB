<template lang="pug">
	v-row
		v-col(cols="12")
			DataTable
</template>
<script>
import DataTable from "~/components/simulator/skill/DataTable";
export default {
  transition: "slide-y-transition",
	components: {
		DataTable
	}
};
</script>
