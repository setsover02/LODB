<template lang="pug">
v-sheet(color="transparent")
	v-row.px-4.py-2(align="center")
		//- TODO: Rank Select, 승급관련 처리 필요
		v-col(cols="4")
			v-select(:items="rank" value="SS" dense small-chips flat hide-details prefix="등급" solo append-icon="mdi-chevron-down")
				template(v-slot:selection="data")
					v-chip(:input-value="data.selected" :color="data.item.color" small) {{ data.item.text }}
				template(v-slot:item="data")
					v-chip(:color="data.item.color" small) {{ data.item.text }}
		//- 레벨 입력 폼
		v-col(cols="4")
			v-text-field(v-model="level" dense flat solo hide-details suffix="레벨"
			type="number" autocomplete="off" min="1" max="90" append-icon="mdi-chevron-double-up" prepend-icon="mdi-chevron-double-down" @click:prepend="level = 1" @click:append="level = 90")
		v-col(cols="auto").pr-0
			v-list(min-width="124" dense color="transparent").py-0
				v-list-item.px-2
					v-switch.mt-0.pt-0(color="primary" hide-details inset)
						template(v-slot:label)
							span.caption 자버프 적용
	v-divider
	//- 이하 강화 포인트 입력 폼
	v-row.px-4.py-2(align="center")
		v-col.subtitle-2 강화
		v-col(cols="auto").primary--text.subtitle-2 잔여포인트
			v-chip.ml-3.white--text(small :color="enhLimitColor" v-text="getEnhLimit")
	v-row.px-4
		v-col(cols="4").text-right
			//- TODO: 현재 캐릭터 스탯 수치 표기(강화 등 아이템 모두 포함)
			v-text-field(v-model="damageEnh"
				dense flat solo hide-details suffix="공격력" append-icon="mdi-chevron-double-up"
				type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
		v-col(cols="4").text-right
			v-text-field(v-model="hitEnh" 
				dense flat solo hide-details suffix="적중" append-icon="mdi-chevron-double-up"
				type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
		v-col(cols="4").text-right
			v-text-field(v-model="critEnh" 
				dense flat solo hide-details suffix="치명" append-icon="mdi-chevron-double-up"
					type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
		v-col(cols="4").text-right
			v-text-field(v-model="healthEnh" 
				dense flat solo hide-details suffix="체력" append-icon="mdi-chevron-double-up"
				type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
		v-col(cols="4").text-right
			v-text-field(v-model="defenseEnh" 
				dense flat solo hide-details suffix="방어력" append-icon="mdi-chevron-double-up"
				type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
		v-col(cols="4").text-right
			v-text-field(v-model="dodgeEnh"
				dense flat solo hide-details suffix="회피" append-icon="mdi-chevron-double-up"
					type="number" counter maxlength="3" autocomplete="off" min="0" max="270")
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    // max8char: v => v.length <= 8 || 'Input too long!', // Memo 룰 8자
    rank: [
      {
        text: 'SS',
        color: 'orange'
      },
      {
        text: 'S',
        color: 'yellow'
      },
      {
        text: 'A',
        color: 'blue'
      },
      {
        text: 'B',
        color: 'green'
      }
    ]
  }),
  computed: {
    ...mapGetters('enhance', ['getEnhLimit']),
    level: {
      get() {
        return this.$store.state.enhance.level
      },
      set(value) {
        this.$store.commit('enhance/SET_LEVEL', value)
      }
    },
    damageEnh: {
      get() {
        return this.$store.state.enhance.damageEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DAMAGE_ENH', value)
      }
    },
    healthEnh: {
      get() {
        return this.$store.state.enhance.healthEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_HEALTH_ENH', value)
      }
    },
    defenseEnh: {
      get() {
        return this.$store.state.enhance.defenseEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DEFENSE_ENH', value)
      }
    },
    hitEnh: {
      get() {
        return this.$store.state.enhance.hitEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_HIT_ENH', value)
      }
    },
    critEnh: {
      get() {
        return this.$store.state.enhance.critEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_CRIT_ENH', value)
      }
    },
    dodgeEnh: {
      get() {
        return this.$store.state.enhance.dodgeEnh
      },
      set(value) {
        this.$store.commit('enhance/SET_DODGE_ENH', value)
      }
    },
    // 잔여스탯 색상
    enhLimitColor() {
      if (this.$store.getters['enhance/getEnhLimit'] < 0) return 'red'
      else return 'primary'
    }
  }
}
</script>