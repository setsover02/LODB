// LODB 2.0 Character store
export const state = () => ({
  sheetData: [0]
});

export const mutations = {
  SET_CHARACTERS(state, sheetData) {
    state.sheetData = sheetData;
    console.log("Success get character data");
  }
};

export const actions = {
  // async asyncData({ commit }) {
  //   const axios = require("axios");
  //   const _ = require("lodash");
  //   const url =
  //     "https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/dataHeroes!A1:AQ1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To";
  //   const response = await axios.get(url);
  //   const rows = response.data.values;
  //   const properties = rows.shift();
  //   const articles = [];
  //   for (const i in rows) {
  //     articles.push(_.zipObject(properties, rows[i]));
  //   }
  //   return { articles };
  //   commit("SET_CHARACTERS");
  // },
  loadCharacterData({ commit }) {
    const axios = require("axios");
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/dataHeroes!A1:AQ1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To";
    axios
      .get(url)
      .then(r => r.data)
      .then(sheetData => {
        commit("SET_CHARACTERS", sheetData);
      });
  }
};
