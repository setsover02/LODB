<template lang="pug">
v-row.fill-height(no-gutters)
	v-col(cols="3")
		SearchForm
		v-divider
		SimulatingForm
	v-divider(vertical).fill-height
</template>
<script>
import SearchForm from "~/components/character/SearchForm";
import SimulatingForm from "~/components/character/SimulatingForm";

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
	components: {
		SearchForm,
		SimulatingForm
	}
};
</script>
