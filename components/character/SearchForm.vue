<template lang="pug">
v-card(color="transparent" elevation="0").pl-1
	//- TODO: Search Config
	v-form(ref="formSearch")
		v-row
			v-col
				//- 검색 필터: 테이블 데이터와 동기화 중
				v-autocomplete(v-model="characterName" :items="character" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
					//- 선택 데이터 chip 형태로 표기
					template(v-slot:selection="data")
						v-chip.white--text(v-bind="data.attrs" :input-value="data.selected")
							v-avatar(left)
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							| {{ data.item.name }}
					//- 검색 리스트에 아바타 추가
					template(v-slot:item="data")
						template(v-if="typeof data.item !== 'object'")
							v-list-item-content(v-text="data.item")
						template(v-else)
							v-list-item-avatar(size="24")
								v-img(:src="require('~/assets/img/avatar/' + data.item.id + '.png')")
							v-list-item-content
								v-list-item-title(v-html="data.item.name")

			v-divider(vertical).d-none.d-lg-flex
			v-col.d-none.d-lg-block.pl-3(cols="auto")
				//- TODO: 등급 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="rank in rankItems" :key="rank" :value="rank") {{ rank }}
			v-divider(vertical).d-none.d-lg-flex
			v-col.d-none.d-lg-block.pl-3(cols="auto")
				//- TODO: 타입 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="type in typeItems" :key="type") {{ type }}
			v-divider(vertical).d-none.d-lg-flex
			v-col.d-none.d-lg-block.pl-3(cols="auto")
				//- TODO: 역할 필터
				v-chip-group.pt-1(multiple active-class="accent--text")
					v-chip(label small v-for="role in roleItems" :key="role") {{ role }}
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    rankItems: ['SS', 'S', 'A', 'B'],
    typeItems: ['기동', '경장', '중장'],
    roleItems: ['공격', '보호', '지원']
  }),
  computed: {
    ...mapGetters([
      'character' // json
    ]),
    // 이름으로 검색
    characterName: {
      get() {
        return this.$store.state.characterName
      },
      set(value) {
        this.$store.commit('SET_SEARCH_NAME', value)
      }
    }
  }
}
</script>