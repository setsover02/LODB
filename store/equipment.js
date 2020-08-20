// 아이템 시트
// 아이템 데이터 필터링
// 아이템 스탯 계산은 preivews 모듈로

import {CONST} from '~/static/const';
export const state = () => ({
  itemsData: [],
  itemRank: CONST.RANK,
  chip1Rank: 'SS',
  chip1Slot: [],
  chip1Enh: 10,
  chip2Rank: 'SS',
  chip2Slot: [],
  chip2Enh: 10,
  osRank: 'SS',
  osSlot: [],
  osEnh: 10,
  gearRank: 'SS',
  gearSlot: [],
  gearEnh: 10,
});

const axios = require('axios');
const _ = require('lodash');

export const actions = {
  // Get Google Sheet data:items
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

export const getters = {
  // filter chip data
  getChipList: state => {
    const check = element => element.check == 'TRUE';
    const slot = element => element.slot == 'chip';
    return state.itemsData.filter(check).filter(slot);
  },
  filterChip1Rank: (state, getters) => {
    const rank = element => element.rank == state.chip1Rank;
    return getters.getChipList.filter(rank);
  },
  filterChip2Rank: (state, getters) => {
    const rank = element => element.rank == state.chip2Rank;
    return getters.getChipList.filter(rank);
  },
  filterOs: state => {
    const check = element => element.check == 'TRUE';
    const slot = element => element.slot == 'os';
    const rank = element => element.rank == state.osRank;
    return state.itemsData
      .filter(check)
      .filter(slot)
      .filter(rank);
  },
  filterGear: state => {
    const check = element => element.check == 'TRUE';
    const slot = element => element.slot == 'gear';
    const rank = element => element.rank == state.gearRank;
    return state.itemsData
      .filter(check)
      .filter(slot)
      .filter(rank);
  }
};

export const mutations = {
  SET_ITEMS_DATA(state, payload) {
    state.itemsData = payload;
  },
  SET_CHIP1_RANK(state, chip1Rank) {
    state.chip1Rank = chip1Rank;
  },
  SET_CHIP1_SLOT(state, chip1Slot) {
    state.chip1Slot = chip1Slot;
  },
  SET_CHIP1_ENH(state, chip1Enh) {
    state.chip1Enh = chip1Enh;
  },
  SET_CHIP2_RANK(state, chip2Rank) {
    state.chip2Rank = chip2Rank;
  },
  SET_CHIP2_SLOT(state, chip2Slot) {
    state.chip2Slot = chip2Slot;
  },
  SET_CHIP2_ENH(state, chip2Enh) {
    state.chip2Enh = chip2Enh;
  },
  SET_OS_RANK(state, osRank) {
    state.osRank = osRank;
  },
  SET_OS_SLOT(state, osSlot) {
    state.osSlot = osSlot;
  },
  SET_OS_ENH(state, osEnh) {
    state.osEnh = osEnh;
  },
  SET_GEAR_RANK(state, gearRank) {
    state.gearRank = gearRank;
  },
  SET_GEAR_SLOT(state, gearSlot) {
    state.gearSlot = gearSlot;
  },
  SET_GEAR_ENH(state, gearEnh) {
    state.gearEnh = gearEnh;
  },
};
