<template lang="pug">
v-row.px-4.py-2(align="center")
	v-col(cols="6")
		v-col.px-0.subtitle-1.font-weight-bold 레벨
		v-text-field(v-model="level" dense flat solo hide-details suffix="레벨" type="number" autocomplete="off" min="1" max="100" append-icon="mdi-chevron-double-up" prepend-inner-icon="mdi-chevron-double-down" @click:prepend-inner="level = 1" @click:append="level = 100")
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    level: {
      get() {
        return this.$store.state.characters.enhance.level;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_LEVEL", value);
      }
    }
	},
};
</script>
