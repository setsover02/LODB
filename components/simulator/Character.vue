<template lang="pug">
//- Character Info
v-sheet.pa-0(width="881" color="transparent")
	FormSelect
	v-divider
	v-row.fill-height(v-if="characterSelect === undefined || characterSelect == 0" no-gutters)
		v-col.fill-height(cols="12")
			v-card.d-flex.flex-column.align-center.justify-center.pt-12(tile color="transparent" elevation="0") 
				//- v-avatar(size="144")
				//-   v-icon(color="t200" size="144") mdi-account-group-outline
					//- v-img(:src="require('~/assets/img/avatar/undefined.png')")
				span.t100--text.text-h5.font-weight-bold Select Character first
	v-row(v-else no-gutters)
		v-col(cols="auto")
			CardStatus
		v-divider(vertical)
		v-col(cols="auto")
			//- Card : DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
			v-card.fill-height__vh-n33.overflow-x-hidden.overflow-y-auto(width="440" tile color="transparent" elevation="0")
				v-expansion-panels(flat tile accordion multiple active-class="t400" elevation="0")
					FormEnhance
					FormLink
					FormSkill
					FormEquipment
					FormSquad
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CardStatus from "~/components/simulator/character/CardStatus";
import FormSelect from "~/components/simulator/character/FormSelect";
import FormEnhance from "~/components/simulator/character/FormEnhance";
import FormLink from "~/components/simulator/character/FormLink";
import FormSkill from "~/components/simulator/character/FormSkill";
import FormEquipment from "~/components/simulator/character/FormEquipment";
import FormSquad from "~/components/simulator/character/FormSquad";

export default {
  components: {
    CardStatus,
    FormSelect,
    FormEnhance,
    FormLink,
    FormSkill,
    FormEquipment,
    FormSquad
  },
  computed: {
		...mapState("data", ["characterSelect"]),
    ...mapGetters("data", ["getCharacterCode"])
  },
  data: () => ({
    characterTabs: null
  })
};
</script>
