<template lang="pug">
v-row.fill-height(no-gutters)
	v-col(cols="auto").fill-height.py-0
		//- div(v-for="article in articles" :keys="article")
		//-   p {{ article.name }}
		//-   p.caption {{ article.rank }}
		v-card(width="470" color="transparent" elevation="0")
			v-row
				v-col
					v-autocomplete(v-model="characterName" :items="articles" item-text="name" item-value="name" label="Search" prepend-inner-icon="mdi-magnify" append-icon="mdi-chevron-down" clearable hide-details color="primary" background-color="transparent" solo flat autocomplete="off")
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
			v-divider
	v-divider(vertical).fill-height
</template>
<script>
const axios = require("axios");
const _ = require("lodash");
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREASHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/dataHeroes!A1:AQ1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To";
export default {
  transition: "slide-y-transition",
  async asyncData() {
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    return { articles };
  },
  data: () => ({
    characterName: ""
  }),
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    remove(item) {
      const index = this.character.indexOf(item.name);
      if (index >= 0) this.character.splice(index, 1);
    }
  }
};
</script>
