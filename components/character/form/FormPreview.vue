<template lang="pug">
v-sheet(elevation="16" tile).linear-t300.sticky
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
	//- TODO: 스킬 계수 및 폼변환 적용
	v-row.py-2
		v-col(cols="auto").d-flex.align-center
			v-menu(left offset-x :close-on-content-click="false" max-width="220")
				template(v-slot:activator="{ on }")
					v-list-item(dense).px-2.pl-3
						v-btn(v-on="on" icon)
							v-icon mdi-settings
				v-list(dense).linear-t400.pb-4
					v-subheader.px-4 버프 설정
					v-list-item.px-5
						v-switch.mt-0.pt-0(color="primary" hide-details inset)

						v-text-field(suffix="중첩" dense flat solo hide-details @wheel=" + 1" type="number" counter autocomplete="off")
					v-divider.my-2
					v-subheader.px-4 철충 설정
					v-list-item
						v-text-field(v-model="enemyDefense" prepend-icon="mdi-shield-account-outline" dense flat solo hide-details prefix="방어력" @wheel=" + 1" type="number" counter autocomplete="off")
					v-list-item.mt-2
						v-text-field(v-model="enemyReduce" prepend-icon="mdi-call-missed" dense flat solo hide-details prefix="피해감소" suffix="%" @wheel=" + 1" type="number" counter autocomplete="off")
					v-list-item.mt-2
						v-text-field(v-model="enemyFrostResist" prepend-icon="mdi-water" dense flat solo hide-details prefix="냉기저항" suffix="%" @wheel=" + 1" type="number" counter autocomplete="off")
					v-list-item.mt-2
						v-text-field(v-model="enemyFireResist" prepend-icon="mdi-fire" dense flat solo hide-details prefix="화염저항" suffix="%" @wheel=" + 1" type="number" counter autocomplete="off")
					v-list-item.mt-2
						v-text-field(v-model="enemyElecResist" prepend-icon="mdi-flash" dense flat solo hide-details prefix="전기저항" suffix="%" @wheel=" + 1" type="number" counter autocomplete="off")
		v-divider(vertical)
		v-col(v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 1스킬 예상데미지(10레벨)
					v-list-item-subtitle.title.green--text.mt-n1(v-text="getSkill01FinalDamage")
					//- 아래는 일반데미지
					v-list-item-subtitle.caption.mt-n1(v-text="getSkill01FinalDamage")
		v-divider(vertical)
		v-col(v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 2스킬 예상데미지(10레벨)
					v-list-item-subtitle.title.green--text.mt-n1(v-text="getSkill02Damage")
					v-list-item-subtitle.caption.mt-n1(v-text="getSkill02Damage")
		v-divider(vertical)
		v-col(cols="auto").d-flex.align-center
			v-list-item(dense).px-2.pr-3
				v-btn(icon color="skyblue")
					v-icon mdi-sync
	v-divider
	v-row.py-2
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 공격력
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterDamage")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 적중
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterHit + '%'")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 치명
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterCrit + '%'")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 방관
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1 57.5%
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 체력
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterHealth")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 방어력
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterDefense")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 회피
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterDodge + '%'")
		v-col(cols="3" v-ripple)
			v-list-item(dense)
				v-list-item-content.py-0
					v-list-item-title.caption.mb-0 행동력
					v-list-item-subtitle.subtitle-1.mint--text.mt-n1(v-text="getCharacterAP")
	v-divider
	v-expansion-panels.v-expansion-panels--flat
		v-expansion-panel
			v-expansion-panel-header(v-ripple).px-4.py-3.subtitle-2 기타 능력치
			v-expansion-panel-content.mx-n2
				v-row
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 피해 감소
							v-list-item-content.py-0.body-2.green--text 50%
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 효과 저항
							v-list-item-content.py-0.body-2.green--text 50%
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 효과 해제
							v-list-item-content.py-0.body-2.green--text 50%
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 사거리
							v-list-item-content.py-0.body-2.green--text(v-text="getCharacterRange")
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 냉기 저항
							v-list-item-content.py-0.body-2.cyan--text(v-text="getFrostResist")
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 화염 저항
							v-list-item-content.py-0.body-2.pink--text(v-text="getFireResist")
					v-col(cols="3" v-ripple)
						v-list-item.min-heaight__auto.px-0(dense)
							v-list-item-content.py-0
								v-list-item-title.caption 전기 저항
							v-list-item-content.py-0.body-2.accent--text(v-text="getElecResist")
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
      'getCharacterDodge',
      'getCharacterRange',
      'getSkill01FinalDamage',
      'getSkill02Damage'
    ]),
    ...mapGetters('equip', [
      'getFrostResist',
      'getFireResist',
      'getElecResist'
    ]),
    // enemy setting
    enemyDefense: {
      get() {
        return this.$store.state.enemy.enemyDefense
      },
      set(value) {
        this.$store.commit('enemy/SET_ENEMY_DEFENSE', value)
      }
    },
    enemyReduce: {
      get() {
        return this.$store.state.enemy.enemyReduce
      },
      set(value) {
        this.$store.commit('enemy/SET_ENEMY_REDUCE', value)
      }
    },
    enemyFrostResist: {
      get() {
        return this.$store.state.enemy.enemyFrostResist
      },
      set(value) {
        this.$store.commit('enemy/SET_ENEMY_FROST_RESIST', value)
      }
    },
    enemyFireResist: {
      get() {
        return this.$store.state.enemy.enemyFireResist
      },
      set(value) {
        this.$store.commit('enemy/SET_ENEMY_FIRE_RESIST', value)
      }
    },
    enemyElecResist: {
      get() {
        return this.$store.state.enemy.enemyElecResist
      },
      set(value) {
        this.$store.commit('enemy/SET_ENEMY_ELEC_RESIST', value)
      }
    }
  }
}
</script>