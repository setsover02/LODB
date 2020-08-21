<template lang="pug">
v-card.px-6.py-4(width="440" tile color="transparent" elevation="0")
	v-row(align="center")
		v-col.subtitle-1.font-weight-bold 최종 스탯
			span.mint--text  (버프 총합),
			span.text--secondary  (스탯창 기준)
	v-alert.mt-2(border="left" colored-border color="yellow" dense icon="mdi-alert").caption OS의 경우 적용범위가 게임과 조금 다릅니다. 일부 능력치는 스탯창과 값이 다를 수 있습니다. 버프 총합(인게임) 값을 참조하세요.
	v-row
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-icon.mr-0
					v-icon(color="red" small) mdi-fire
				v-list-item-content
					v-list-item-title.caption 화염저항
					v-list-item-subtitle(:class="{'red--text': getFireResist > 0}").text-h6.t100--text.font-weight-bold {{ 100 * getFireResist + '%'}}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-icon.mr-0
					v-icon(color="blue" small) mdi-water
				v-list-item-content
					v-list-item-title.caption 냉기저항
					v-list-item-subtitle(:class="{'blue--text': getFrostResist > 0}").text-h6.t100--text.font-weight-bold {{ 100 * getFrostResist + '%'}}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-icon.mr-0
					v-icon(color="yellow" small) mdi-flash
				v-list-item-content
					v-list-item-title.caption 전기저항
					v-list-item-subtitle(:class="{'yellow--text': getElectricResist > 0}").text-h6.t100--text.font-weight-bold {{ 100 * getElectricResist + '%'}}
	v-divider
	v-row
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 체력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getHealth }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getHealth }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 방어력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDefenseBuff }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getDefense }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 회피
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getEvaBuff }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getEva }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 행동력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getSpeedBuff }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getSpeed }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 공격력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDamageBuff }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getDamage }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 치명타
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getCrit }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getCrit }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 적중
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getAccBuff }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getAcc }}

	v-divider
	v-row
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 방어구 관통력
					v-list-item-subtitle(:class="{'mint--text': getPenetrationBuff > 0}").text-h6.t100--text.font-weight-bold {{ 100 * getPenetrationBuff + "%" }}
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 사거리
					v-list-item-subtitle(:class="{'mint--text': getRange > 0, 'red--text': getRange < 0}").text-h6.t100--text.font-weight-bold {{ getRange }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 중장형 추가피해
					v-list-item-subtitle(:class="{'mint--text': getEquipmentDamageVarHeavy != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getEquipmentDamageVarHeavy }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 경장형 추가피해
					v-list-item-subtitle(:class="{'mint--text': getEquipmentDamageVarLight != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getEquipmentDamageVarLight }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 기동형 추가피해
					v-list-item-subtitle(:class="{'mint--text': getEquipmentDamageVarFlying != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getEquipmentDamageVarFlying }}
	v-divider
	v-row
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 피해감소
					v-list-item-subtitle(:class="{'mint--text': getReduce > 0, 'red--text': getReduce < 0}").text-h6.t100--text.font-weight-bold {{ getReduce + '%' }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과저항
					v-list-item-subtitle(:class="{'mint--text': getEffectResist > 0, 'red--text': getEffectResist < 0}").text-h6.t100--text.font-weight-bold {{ getEffectResist + '%' }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과해제
					v-list-item-subtitle(:class="{'mint--text': getEffectCancel > 0, 'red--text': getEffectCancel < 0}").text-h6.t100--text.font-weight-bold {{ getEffectCancel + '%'}}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 적중감소해제 확률
					v-list-item-subtitle(:class="{'mint--text': getAccRelBuff != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getAccRelBuff }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 회피감소해제 확률
					v-list-item-subtitle(:class="{'mint--text': getEvaRelBuff != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getEvaRelBuff }}
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 사거리감소해제 확률
					v-list-item-subtitle(:class="{'mint--text': getRangeRelBuff != '0.0%'}").text-h6.t100--text.font-weight-bold {{ getRangeRelBuff }}
</template>
<script>
import {mapState, mapGetters} from 'vuex';

export default {
  data: () => ({
    characterTabs: null,
  }),
  computed: {
    ...mapGetters('character/health', ['getHealth']),
    ...mapGetters('character/damage', ['getDamage', 'getDamageBuff', 'getEquipmentDamageVarLight', 'getEquipmentDamageVarHeavy', 'getEquipmentDamageVarFlying', 'getPenetrationBuff']),
    ...mapGetters('character/defense', ['getDefense', 'getDefenseBuff']),
    ...mapGetters('character/evasion', ['getEva', 'getEvaBuff', 'getEvaRelBuff']),
    ...mapGetters('character/speed', ['getSpeed', 'getSpeedBuff']),
    ...mapGetters('character/critical', ['getCrit', 'getCritBuff']),
    ...mapGetters('character/accuracy', ['getAcc', 'getAccBuff', 'getAccRelBuff']),
    ...mapGetters('character/range', ['getRange', 'getRangeRelBuff']),
    ...mapGetters('character/defensive', ['getFireResist', 'getFrostResist', 'getElectricResist', 'getReduce', 'getEffectResist', 'getEffectCancel']),
  },
  // methods: {
  //   healthColor: function() {
  //     if (this.$store.state.enhance.pointHealth > 0) return true;
  //     else false;
	// 	},
  // },
};
</script>
