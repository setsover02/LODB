import {CONST} from '~/static/const';
export const state = () => ({
  characterSkill: [],
});
const axios = require('axios');
const _ = require('lodash');

export const actions = {
  async asyncCharacterSkill({commit}) {
    let sheetName = 'characterSkill';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheetName}!A1:H1000?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_CHARACTERS_SKILL', articles);
  },
};
export const mutations = {
  SET_CHARACTERS_SKILL(state, payload) {
    state.characterSkill = payload;
  },
};
