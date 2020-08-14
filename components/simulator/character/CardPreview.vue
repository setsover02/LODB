<template lang="pug">
v-card.px-6.py-4(width="440" tile color="transparent" elevation="0")
	v-row(align="center")
		v-col.subtitle-1.font-weight-bold 최종 스탯
			span.mint--text  (스탯창),
			span.text--secondary  (인게임 모든버프 포함)
	v-row
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 체력
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold {{ getHealth }}
					v-list-item-subtitle.mt-n1 {{ getHealth }}
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 치명타
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 공격력
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 적중
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 방어력
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 회피
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
		v-col(cols="12" lg="3" md="3" sm="6")
			v-list-item(three-line dense).px-0
				v-list-item-content
					v-list-item-title.caption 행동력
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 1232
					v-list-item-subtitle.mt-n1 431
	v-divider
	v-row
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 방어구 관통력
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold 43%
		v-col(cols="6")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 사거리
					v-list-item-subtitle.subtitle-1.mint--text.font-weight-bold +1
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 중장형 추가피해
					v-list-item-subtitle.subtitle-1.primary--text.font-weight-bold 43%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 경장형 추가피해
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 기동형 추가피해
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
	v-divider
	v-row
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 화염저항
					v-list-item-subtitle.subtitle-1.red--text.font-weight-bold 43%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 냉기저항
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 전기저항
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 피해감소
					v-list-item-subtitle.subtitle-1.primary--text.font-weight-bold 43%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과저항
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
		v-col(cols="4")
			v-list-item(dense).px-0
				v-list-item-content
					v-list-item-title.caption 효과해제
					v-list-item-subtitle.subtitle-1.t100--text.font-weight-bold 0%
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    characterTabs: null
  }),
  computed: {
    ...mapGetters("preview", ["getHealth"])
  }
};
</script>
