// LODB 2.0 Character store
// 01 Get Google Sheet
// 02 SearchForm Component state
export const state = () => ({
  characterData: [],
  characterSelect: [0] // require default value
});

export const mutations = {
  // Google Sheet
  SET_CHARACTERS_DATA(state, payload) {
    state.characterData = payload;
  },
  // SearchForm select
  SET_CHARACTERS_SELECT(state, characterSelect) {
    state.characterSelect = characterSelect;
  }
};

export const actions = {
  // Get Google Sheet data
  async asyncData({ state, commit }) {
    const axios = require("axios");
    const _ = require("lodash");
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/dataHeroes!A1:AQ1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To";
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];

    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit("SET_CHARACTERS_DATA", articles);
  }
};