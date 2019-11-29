<template lang="pug">
v-card.radial-t200.pl-1
	//- TODO: Search Config
	v-form(ref="formSearch")
		v-row
			v-col
				//- 검색 필터: 테이블 데이터와 동기화 중
				v-autocomplete(v-model="name" :items="items" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
					//- 선택 데이터 표기(삭제시 이름만 출력)
					template(v-slot:selection="data")
						v-chip.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-avatar(left)
								v-img(:src="data.item.avatar")
							| {{ data.item.name }}
					//- 리스트에 아바타 추가
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item")
						template(v-else)
							v-list-item-avatar(size="24")
								v-img(:src="data.item.avatar")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")

			v-divider(vertical)
			v-col.pl-3(cols="auto")
				//- TODO: 등급 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="rarity in rarityFilter" :key="rarity") {{ rarity }}
			v-divider(vertical)
			v-col.pl-3(cols="auto")
				//- TODO: 타입 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="type in typeFilter" :key="type") {{ type }}
			v-divider(vertical)
			v-col.pl-3(cols="auto")
				//- TODO: 역할 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="role in roleFilter" :key="role") {{ role }}
</template>
<script>
const char = [
  {
    id: '002',
    avatar: require('~/assets/img/avatar/002.png'),
    name: '라비아타 프로토타입',
    rarity: 'SS',
    type: '중장형',
    role: '공격기',
    level: '90',
    health: 7405,
    damage: 2405,
    hit: '201%',
    crit: '12%',
    dodge: '132%',
    def: '138',
    ap: '4.05',
    equip: {
      e1: '',
      e2: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      e3: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      e4: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
    },
    memo: '가나다라마바사'
  }
]
export default {
  data: () => ({

	}),
	methods: {
		name() {
			this.$store.state.character.name
		}
	}
}
</script>