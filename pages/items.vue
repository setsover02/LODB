<template lang="pug">
div
	v-row
		v-col
			v-data-iterator(:items="items" :search="search" hide-default-footer)
				template(v-slot:header)
					v-card.mb-1.radial-t200
						v-row
							v-col.pl-3(cols="auto")
								//- TODO: 장비 종류
								v-chip-group.pt-1(multiple row active-class="accent--text")
									v-chip(label small) OS
									v-chip(label small) Chip
									v-chip(label small) A
							v-divider(vertical)
							v-col.pl-3(cols="auto")
								v-chip-group.pt-1(multiple column)
									v-chip(label small active-class="orange--text") SS
									v-chip(label small active-class="yellow--text") S
									v-chip(label small active-class="blue--text") A
									v-chip(label small active-class="mint--text") B
							v-divider(vertical)
							v-col.pr-2
								v-text-field(v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
								hide-details color="primary" background-color="transparent" solo flat)
				template(v-slot:default="props")
					//- Item Card
					v-row
						//- TODO: key 값 수정해야함. item.name, item.class 두 개를 되게하면 좋음, 또는 아이템 고유아이디 사용
						v-col(cols="3" v-for="item in props.items" :key="item.name")
							v-card.radial-t200
								v-list-item
									v-list-item-avatar(size="48" color="t500" tile)
										v-img(src="https://cdn.vuetifyjs.com/images/john.jpg")
									v-list-item-content
										v-list-item-title {{ item.name }}
										v-list-item-subtitle {{ item.type }}
									v-list-item-action
										v-chip(label small color="orange") {{ item.class }}
								v-divider
								//- TODO: Data Table
								v-card-text 1523
</template>
<script>
export default {
  data() {
    return {
      search: '',
      filter: {},
      items: [
        {
          name: 'Frozen Yogurt',
          class: 'SS',
          type: 'OS'
        },
        {
          name: 'Ice cream sandwich',
          class: 'SS',
          type: 'OS'
        }
      ]
    }
	}
}
</script>