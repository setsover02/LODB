<template lang="pug">
v-expansion-panel.transparent
	v-expansion-panel-header
		v-row.mr-2(align="center")
			v-col.subtitle-1.font-weight-bold 장비
			v-col.pl-5(cols="auto")
				//- TODO: equipment Preview
				v-icon(v-if="chip1Rank == 'SS'" color="orange") mdi-circle-medium
				v-icon(v-else-if="chip1Rank == 'S'" color="yellow") mdi-circle-medium
				v-icon(v-else-if="chip1Rank == 'A'" color="blue") mdi-circle-medium
				v-icon(v-else-if="chip1Rank == 'B'" color="mint") mdi-circle-medium

				v-icon(v-if="chip2Rank == 'SS'" color="orange") mdi-circle-medium
				v-icon(v-else-if="chip2Rank == 'S'" color="yellow") mdi-circle-medium
				v-icon(v-else-if="chip2Rank == 'A'" color="blue") mdi-circle-medium
				v-icon(v-else-if="chip2Rank == 'B'" color="mint") mdi-circle-medium
				
				v-icon(v-if="osRank == 'SS'" color="orange") mdi-circle-medium
				v-icon(v-else-if="osRank == 'S'" color="yellow") mdi-circle-medium
				v-icon(v-else-if="osRank == 'A'" color="blue") mdi-circle-medium
				v-icon(v-else-if="osRank == 'B'" color="mint") mdi-circle-medium
				
				v-icon(:color="getGearSlotColor()") mdi-circle-medium
				//- v-icon(v-else-if="gearRank == 'S' && gearSlot == Object" color="yellow") mdi-circle-medium
				//- v-icon(v-else-if="gearRank == 'A' && gearSlot == Object" color="blue") mdi-circle-medium
				//- v-icon(v-else-if="gearRank == 'B' && gearSlot == Object" color="mint") mdi-circle-medium
				//- v-icon(v-else color="t100") mdi-circle-medium
	v-expansion-panel-content
		//- BEGIN: Chip1
		v-row
			v-col(cols="3")
				p.body-2.mb-2 칩
				v-select.mb-2(v-model="chip1Rank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="chip1Slot" :items="filterChip1Rank" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
																//- 아이템 리스트 효과 미리보기 칩
								v-list-item-subtitle.mt-1
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small v-html="'중장형 ' + 100 * (data.item.damageVarHeavy || '').split(', ')[gearEnh] + '%'")
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small v-html="'적중 ' + (data.item.acc || '').split(', ')[gearEnh] + '%'")
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damage != '' && data.item.damage != undefined" x-small) 공격력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVar != '' && data.item.damageVar != undefined" x-small) 공격력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarLight != '' && data.item.damageVarLight != undefined" x-small) 경장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarFlying != '' && data.item.damageVarFlying != undefined" x-small) 기동형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small) 중장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small) 적중
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.crit != '' && data.item.crit != undefined" x-small) 치명
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.eva != '' && data.item.eva != undefined" x-small) 회피
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defense != '' && data.item.defense != undefined" x-small) 방어
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defenseVar != '' && data.item.defenseVar != undefined" x-small) 방어 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.health != '' && data.item.health != undefined" x-small) 체력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speed != '' && data.item.speed != undefined" x-small) 행동력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speedVar != '' && data.item.speedVar != undefined" x-small) 행동력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.ap != '' && data.item.ap != undefined" x-small) AP
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.penetration != '' && data.item.penetration != undefined" x-small) 방어관통
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.reduce != '' && data.item.reduce != undefined" x-small) 피해감소
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.range != '' && data.item.range != undefined" x-small ) 사거리
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectResist != '' && data.item.effectResist != undefined" x-small) 효과저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectCancel != '' && data.item.effectCancel != undefined" x-small) 효과해제
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.frostResist != '' && data.item.frostResist != undefined" x-small) 냉기저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.fireResist != '' && data.item.fireResist != undefined" x-small) 화염저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.electricResist != '' && data.item.electricResist != undefined" x-small) 전기저항
				v-text-field.mb-2(v-model="chip1Enh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: CHiP1
			//- BEGIN: Chip2
			v-col(cols="3")
				p.body-2.mb-2 칩
				v-select.mb-2(v-model="chip2Rank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="chip2Slot" :items="filterChip2Rank" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
																//- 아이템 리스트 효과 미리보기 칩
								v-list-item-subtitle.mt-1
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small v-html="'중장형 ' + 100 * (data.item.damageVarHeavy || '').split(', ')[gearEnh] + '%'")
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small v-html="'적중 ' + (data.item.acc || '').split(', ')[gearEnh] + '%'")
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damage != '' && data.item.damage != undefined" x-small) 공격력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVar != '' && data.item.damageVar != undefined" x-small) 공격력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarLight != '' && data.item.damageVarLight != undefined" x-small) 경장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarFlying != '' && data.item.damageVarFlying != undefined" x-small) 기동형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small) 중장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small) 적중
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.crit != '' && data.item.crit != undefined" x-small) 치명
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.eva != '' && data.item.eva != undefined" x-small) 회피
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defense != '' && data.item.defense != undefined" x-small) 방어
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defenseVar != '' && data.item.defenseVar != undefined" x-small) 방어 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.health != '' && data.item.health != undefined" x-small) 체력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speed != '' && data.item.speed != undefined" x-small) 행동력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speedVar != '' && data.item.speedVar != undefined" x-small) 행동력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.ap != '' && data.item.ap != undefined" x-small) AP
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.penetration != '' && data.item.penetration != undefined" x-small) 방어관통
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.reduce != '' && data.item.reduce != undefined" x-small) 피해감소
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.range != '' && data.item.range != undefined" x-small ) 사거리
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectResist != '' && data.item.effectResist != undefined" x-small) 효과저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectCancel != '' && data.item.effectCancel != undefined" x-small) 효과해제
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.frostResist != '' && data.item.frostResist != undefined" x-small) 냉기저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.fireResist != '' && data.item.fireResist != undefined" x-small) 화염저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.electricResist != '' && data.item.electricResist != undefined" x-small) 전기저항
				v-text-field.mb-2(v-model="chip2Enh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: CHiP2
			//- BEGIN: OS
			v-col(cols="3")
				p.body-2.mb-2 OS
				v-select.mb-2(v-model="osRank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="osSlot" :items="filterOs" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
																//- 아이템 리스트 효과 미리보기 칩
								v-list-item-subtitle.mt-1
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small v-html="'중장형 ' + 100 * (data.item.damageVarHeavy || '').split(', ')[gearEnh] + '%'")
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small v-html="'적중 ' + (data.item.acc || '').split(', ')[gearEnh] + '%'")
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damage != '' && data.item.damage != undefined" x-small) 공격력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVar != '' && data.item.damageVar != undefined" x-small) 공격력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarLight != '' && data.item.damageVarLight != undefined" x-small) 경장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarFlying != '' && data.item.damageVarFlying != undefined" x-small) 기동형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small) 중장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small) 적중
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.crit != '' && data.item.crit != undefined" x-small) 치명
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.eva != '' && data.item.eva != undefined" x-small) 회피
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defense != '' && data.item.defense != undefined" x-small) 방어
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defenseVar != '' && data.item.defenseVar != undefined" x-small) 방어 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.health != '' && data.item.health != undefined" x-small) 체력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speed != '' && data.item.speed != undefined" x-small) 행동력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speedVar != '' && data.item.speedVar != undefined" x-small) 행동력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.ap != '' && data.item.ap != undefined" x-small) AP
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.penetration != '' && data.item.penetration != undefined" x-small) 방어관통
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.reduce != '' && data.item.reduce != undefined" x-small) 피해감소
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.range != '' && data.item.range != undefined" x-small ) 사거리
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectResist != '' && data.item.effectResist != undefined" x-small) 효과저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectCancel != '' && data.item.effectCancel != undefined" x-small) 효과해제
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.frostResist != '' && data.item.frostResist != undefined" x-small) 냉기저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.fireResist != '' && data.item.fireResist != undefined" x-small) 화염저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.electricResist != '' && data.item.electricResist != undefined" x-small) 전기저항
				v-text-field.mb-2(v-model="osEnh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
			//- END: OS
			//- BEGIN: GEAR

			v-col(cols="3")
				p.body-2.mb-2 보조장비
				v-select.mb-2(v-model="gearRank" :items="itemRank" attach small-chips dense solo flat hide-details append-icon="mdi-chevron-down" )
					template(v-slot:selection="data")
						v-chip(:input-value="data.selected" small :color="data.item.color") {{ data.item.text }}
					template(v-slot:item="data")
						//- span(small v-if="data.item == null")
						v-chip(small v-if="data.item.text !== 'null'" :color="data.item.color") {{ data.item.text }}
				v-autocomplete.items.mb-2(v-model="gearSlot" :items="filterGear" item-text="name" item-value="id" solo flat hide-details dense :menu-props="{ top: false }" return-object auto-select-first append-icon="mdi-chevron-down" autocomplete="off")
					template(v-slot:selection="data")
						v-list-item.px-0.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-list-item-avatar(tile size="48")
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item.name")
						template(v-else)
							v-list-item-avatar.border-4(size="48" tile)
								v-img(:src="require('~/assets/img/items/' + data.item.id + '.webp')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")
								//- 아이템 리스트 효과 미리보기 칩
								v-list-item-subtitle.mt-1
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small v-html="'중장형 ' + 100 * (data.item.damageVarHeavy || '').split(', ')[gearEnh] + '%'")
									//- v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small v-html="'적중 ' + (data.item.acc || '').split(', ')[gearEnh] + '%'")
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damage != '' && data.item.damage != undefined" x-small) 공격력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVar != '' && data.item.damageVar != undefined" x-small) 공격력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarLight != '' && data.item.damageVarLight != undefined" x-small) 경장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarFlying != '' && data.item.damageVarFlying != undefined" x-small) 기동형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.damageVarHeavy != '' && data.item.damageVarHeavy != undefined" x-small) 중장형 추가피해
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.acc != '' && data.item.acc != undefined" x-small) 적중
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.crit != '' && data.item.crit != undefined" x-small) 치명
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.eva != '' && data.item.eva != undefined" x-small) 회피
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defense != '' && data.item.defense != undefined" x-small) 방어
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.defenseVar != '' && data.item.defenseVar != undefined" x-small) 방어 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.health != '' && data.item.health != undefined" x-small) 체력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speed != '' && data.item.speed != undefined" x-small) 행동력
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.speedVar != '' && data.item.speedVar != undefined" x-small) 행동력 %
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.ap != '' && data.item.ap != undefined" x-small) AP
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.penetration != '' && data.item.penetration != undefined" x-small) 방어관통
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.reduce != '' && data.item.reduce != undefined" x-small) 피해감소
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.range != '' && data.item.range != undefined" x-small ) 사거리
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectResist != '' && data.item.effectResist != undefined" x-small) 효과저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.effectCancel != '' && data.item.effectCancel != undefined" x-small) 효과해제
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.frostResist != '' && data.item.frostResist != undefined" x-small) 냉기저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.fireResist != '' && data.item.fireResist != undefined" x-small) 화염저항
									v-chip.font-weight-medium.px-2.mr-1(v-if="data.item.electricResist != '' && data.item.electricResist != undefined" x-small) 전기저항
				v-text-field.mb-2(v-model="gearEnh" solo flat dense hide-details type="number" suffix="강화" min="0" max="10")
		//- END: GRAR
</template>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
	mounted() {
		this.$store.dispatch('equipment/asyncItems');
	},
	computed: {
		...mapState('equipment', ['itemRank']),
		...mapGetters('equipment', ['filterChip1Rank', 'filterChip2Rank', 'filterOs', 'filterGear']),
		chip1Rank: {
			get() {
				return this.$store.state.equipment.chip1Rank;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_RANK', value);
			},
		},
		chip1Slot: {
			get() {
				return this.$store.state.equipment.chip1Slot;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_SLOT', value);
			},
		},
		chip1Enh: {
			get() {
				return this.$store.state.equipment.chip1Enh;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP1_ENH', value);
			},
		},
		chip2Rank: {
			get() {
				return this.$store.state.equipment.chip2Rank;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_RANK', value);
			},
		},
		chip2Slot: {
			get() {
				return this.$store.state.equipment.chip2Slot;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_SLOT', value);
			},
		},
		chip2Enh: {
			get() {
				return this.$store.state.equipment.chip2Enh;
			},
			set(value) {
				this.$store.commit('equipment/SET_CHIP2_ENH', value);
			},
		},
		osRank: {
			get() {
				return this.$store.state.equipment.osRank;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_RANK', value);
			},
		},
		osSlot: {
			get() {
				return this.$store.state.equipment.osSlot;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_SLOT', value);
			},
		},
		osEnh: {
			get() {
				return this.$store.state.equipment.osEnh;
			},
			set(value) {
				this.$store.commit('equipment/SET_OS_ENH', value);
			},
		},
		gearRank: {
			get() {
				return this.$store.state.equipment.gearRank;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_RANK', value);
			},
		},
		gearSlot: {
			get() {
				return this.$store.state.equipment.gearSlot;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_SLOT', value);
			},
		},
		gearEnh: {
			get() {
				return this.$store.state.equipment.gearEnh;
			},
			set(value) {
				this.$store.commit('equipment/SET_GEAR_ENH', value);
			},
		},
	},
	methods: {
		getGearSlotColor() {
			const r = this.$store.state.equipment.gearRank
			const s = this.$store.state.equipment.gearSlot
			if (r == 'SS' && s != Array[0])  return 'orange'
			else if (r == 'S') return 'yellow'
			else if (r == 'A') return 'blue'
			else if (r == 'B') return 'mint'
			else return 't100'
		}
	}
};
</script>
