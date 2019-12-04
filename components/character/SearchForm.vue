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
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							| {{ data.item.name }}
					//- 리스트에 아바타 추가
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item")
						template(v-else)
							v-list-item-avatar(size="24")
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")

			v-divider(vertical)
			v-col.pl-3(cols="auto")
				//- TODO: 등급 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="rank in rankFilter" :key="rank") {{ rank }}
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import character from '~/data/character.json'
export default {
  data: () => ({
    items: character, // 테이블 데이터
    rankFilter: ['SS', 'S', 'A', 'B'],
    typeFilter: ['기동형', '경장형', '중장형'],
    roleFilter: ['공격기', '보호기', '지원기']
  }),
  // methods: {
  //   name() {
  //     this.$store.state.character.name
  //   }
  // },
  computed: {
    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('searchName', value)
      }
    }
  }
}
</script>