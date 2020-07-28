<template lang="pug">
v-sheet(color="transparent").px-4.py-2
	//- Remaining point
	v-row(align="center")
		v-col.subtitle-2 강화
		v-col(cols="auto").primary--text.subtitle-2 잔여포인트
			v-chip.ml-3.white--text(small :color="remainingColor" v-text="getRemainingPoint")

	//- Point form
	v-row
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-ammunition" v-model="pointDamage" dense flat solo hide-details suffix="공격력" @wheel="pointDamage + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-hospital-box" v-model="pointHealth" dense flat solo hide-details suffix="체력" @wheel="pointHealth + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-shield" v-model="pointDefense" dense flat solo hide-details suffix="방어력" @wheel="pointDefense + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-target" v-model="pointHit" dense flat solo hide-details suffix="적중" @wheel="pointHit + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-star-four-points" v-model="pointCrit" dense flat solo hide-details suffix="치명" @wheel="pointCrit + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		v-col(cols="4")
			v-text-field(prepend-inner-icon="mdi-menu" v-model="pointDodge" dense flat solo hide-details suffix="회피" @wheel="pointDodge + 1" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
		//- v-for point form:: not working
		//- https://stackoverflow.com/questions/40913456/vue-js-with-vuex-computed-properties-with-v-for-and-v-model
		//- v-col(cols="4" v-for="(point, index) in points" :key="point.name")
		//- 	v-text-field(@change="updatePoint(index, $event.target.value)" dense flat solo hide-details :suffix="point.suffix" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
			//- v-text-field(@input="v => updateValue(index, v)" :value="points[index].value" dense flat solo hide-details :suffix="point.suffix" type="number" counter maxlength="3" autocomplete="off" min="0" max="300")
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("characters/enhance", ["getRemainingPoint"]),

    // 잔여스탯 색상
    remainingColor() {
      if (this.$store.getters["characters/enhance/getRemainingPoint"] < 0)
        return "red";
      else return "primary";
    },

    //- Point form text field
    pointDamage: {
      get() {
        return this.$store.state.characters.enhance.pointDamage;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_DAMAGE", value);
      }
    },
    pointHealth: {
      get() {
        return this.$store.state.characters.enhance.pointHealth;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_HEALTH", value);
      }
    },
    pointDefense: {
      get() {
        return this.$store.state.characters.enhance.pointDefense;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_DEFENSE", value);
      }
    },
    pointHit: {
      get() {
        return this.$store.state.characters.enhance.pointHit;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_HIT", value);
      }
    },
    pointCrit: {
      get() {
        return this.$store.state.characters.enhance.pointCrit;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_CRIT", value);
      }
    },
    pointDodge: {
      get() {
        return this.$store.state.characters.enhance.pointDodge;
      },
      set(value) {
        this.$store.commit("characters/enhance/SET_POINT_DODGE", value);
      }
    }
	},
	
	//- v-for point form:: not working
  // methods: {
  //   updatePoint(index, val) {
  //     store.commit("characters/enhance/SET_POINT", { index, val });
  //   }
  // }
};
</script>
