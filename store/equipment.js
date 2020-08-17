import {CONST} from '~/static/const';
export const state = () => ({
  itemsData: [],
});

const axios = require('axios');
const _ = require('lodash');

export const actions = {
  // Get Google Sheet data
  // 01: characterBase sheet
  async asyncItems({commit}) {
    let sheetName = 'items';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheetName}!A1:AD1000?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_ITEMS_DATA', articles);
  },
};

export const mutations = {
  SET_ITEMS_DATA(state, payload) {
		state.itemsData = payload;
	},
};