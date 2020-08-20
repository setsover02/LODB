<template lang="pug">
v-card.px-6.py-4(tile color="transparent" elevation="0")
	v-row(align="center")
		v-col.subtitle-1.font-weight-bold 최종 스탯
			span.mint--text  (버프 총합),
			span.text--secondary  (스탯창 기준)
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
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDefense }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getDefense }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 회피
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getEva }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getEva }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 행동력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getSpeed }}
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
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getAcc }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getAcc }}

	v-divider
	v-row
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 방어구 관통력
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold 43%
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 사거리
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold +1
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 중장형 추가피해
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDamageToHeavy }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getEquipmentDamageVarHeavy }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 경장형 추가피해
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDamageToLight }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getEquipmentDamageVarLight }}
		v-col(cols="4")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 기동형 추가피해
					v-list-item-subtitle.text-h6.mint--text.font-weight-bold {{ getDamageToFlyer }}
					v-list-item-subtitle.subtitle-1.mt-n1 {{ getEquipmentDamageVarFlyer }}
	v-divider
	v-row
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 화염저항
					v-list-item-subtitle.text-h6.red--text.font-weight-bold 43%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 냉기저항
					v-list-item-subtitle.text-h6.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 전기저항
					v-list-item-subtitle.text-h6.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 피해감소
					v-list-item-subtitle.text-h6.primary--text.font-weight-bold 43%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과저항
					v-list-item-subtitle.text-h6.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과해제
					v-list-item-subtitle.text-h6.t100--text.font-weight-bold 0%
</template>
<script>
import {mapState, mapGetters} from 'vuex';

export default {
  data: () => ({
    characterTabs: null,
  }),
  computed: {
    ...mapGetters('previews/health', ['getHealth']),
    ...mapGetters('previews/damage', ['getDamage', 'getDamageBuff', 'getEquipmentDamageVarLight', 'getDamageToLight', 'getEquipmentDamageVarHeavy', 'getDamageToHeavy', 'getEquipmentDamageVarFlyer', 'getDamageToFlyer']),
    ...mapGetters('previews/defense', ['getDefense']),
    ...mapGetters('previews/evasion', ['getEva']),
    ...mapGetters('previews/speed', ['getSpeed']),
    ...mapGetters('previews/critical', ['getCrit']),
    ...mapGetters('previews/accuracy', ['getAcc']),
  },
};
</script>
