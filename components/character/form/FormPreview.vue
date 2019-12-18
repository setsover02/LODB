<template lang="pug">
v-sheet(tile).linear-t400.sticky
	v-row
		v-col(cols="12")
			v-list-item
				v-list-item-avatar.radius-4(size="48" color="t500")
					v-img(:src="require('~/assets/img/avatar/' + getCharacterId + '.png')" :lazy-src="require('~/assets/img/avatar/undefined.png')")
				v-list-item-content
					v-list-item-title.title(v-text="getCharacterName")
					v-list-item-subtitle {{ getCharacterType }} • {{ getCharacterRole }}
				//- TODO: 초기화 시 하단 폼에 입력한 내용 전체 초기화(우선순위 낮음)
				v-list-item-action
					v-btn(text color="primary" disabled) 초기화
				//- TODO: 저장 시 해당 폼의 정보가 DataTable에 추가되어야 함  
				v-list-item-action
					v-btn(color="primary" disabled) 저장
	v-divider 
	v-row.py-2
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 공격력
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterDamage")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 적중
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterHit + '%'")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 치명
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterCrit + '%'")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 방관
					v-list-item-subtitle.title.accent--text.mt-n1 57.5%
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 체력
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterHealth")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 방어력
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterDefense")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 회피
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterDodge + '%'")
		v-col(cols="3")
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 행동력
					v-list-item-subtitle.title.accent--text.mt-n1(v-text="getCharacterAP")
	v-divider
	v-expansion-panels.v-expansion-panels--flat
		v-expansion-panel
			v-expansion-panel-header.px-4.py-3.subtitle-2 기타 능력치
			v-expansion-panel-content
				v-row
					v-col(cols="3")
						v-list-item.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 효과 저항
							v-list-item-content.body-2.accent--text 50%
					v-col(cols="3")
						v-list-item.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 피해 감소
							v-list-item-content.body-2.accent--text 50%
					v-col(cols="3")
						v-list-item.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 전기 저항
							v-list-item-content.body-2.accent--text 50%
					v-col(cols="3")
						v-list-item.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 화염 저항
							v-list-item-content.body-2.accent--text 50%
					v-col(cols="3")
						v-list-item.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 냉기 저항
							v-list-item-content.body-2.accent--text 50%
	v-divider
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('enhance', [
      'getCharacterId',
      'getCharacterName',
      'getCharacterType',
      'getCharacterRole',
      'getCharacterDamage',
      'getCharacterHit',
      'getCharacterCrit',
      'getCharacterAP',
      'getCharacterHealth',
      'getCharacterDefense',
      'getCharacterDodge'
    ])
  }
}
</script>