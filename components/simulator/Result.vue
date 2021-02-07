<template lang="pug">
//- Character Info
v-sheet(width="480" color="transparent").fill-height__vh-n33.overflow-x-hidden.overflow-y-auto
	FormEnemy
	v-divider
	div(v-if="characterSelect === undefined || characterSelect == 0")
	CardCharacter(v-else)
</template>
<script>
import { mapState, mapGetters } from "vuex";
import FormEnemy from "~/components/simulator/result/FormEnemy";
import CardCharacter from "~/components/simulator/result/CardCharacter";

export default {
	components: {
		FormEnemy,
		CardCharacter,
	},
  computed: {
		...mapState("data", ["characterSelect"]),
  },
};
</script>
