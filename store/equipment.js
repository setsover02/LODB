// 아이템 시트
// 아이템 데이터 필터링
// 전체 아이템 증가스탯 계산 (OS는 별도 계산됨)

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
    const slot = element => element.slot == 'chip';
    return state.itemsData.filter(slot);
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
    const slot = element => element.slot == 'os';
    const rank = element => element.rank == state.osRank;
    return state.itemsData.filter(slot).filter(rank);
  },
  filterGear: state => {
    const slot = element => element.slot == 'gear';
    const rank = element => element.rank == state.gearRank;
    return state.itemsData.filter(slot).filter(rank);
  },

  // Get item stat
  // OS는 버프류로 취급
  getChip1Damage: state => {
    const c = state.chip1Slot;
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else {
      return Number(c.damage.split(',')[state.chip1Enh]);
    }
  },
  getChip2Damage: state => {
    const c = state.chip2Slot;
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else {
      return Number(c.damage.split(',')[state.chip2Enh]);
    }
  },
  getGearDamage: state => {
    const c = state.gearSlot;
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else {
      return Number(c.damage.split(',')[state.gearEnh]);
    }
  },
  getOsDamage: state => {
    const c = state.osSlot;
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else {
      return Number(c.damage.split(',')[state.osEnh]);
    }
  },
  getDamage: (state, getters) => {
    return getters.getChip1Damage + getters.getChip2Damage + getters.getGearDamage;
  },

  getChip1DamageVar: state => {
    const c = state.chip1Slot;
    const e = state.chip1Enh;
    const v = (c.damageVar || '').split(',');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getChip2DamageVar: state => {
    const c = state.chip2Slot;
    const e = state.chip2Enh;
    const v = (c.damageVar || '').split(',');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 강화값이 없을 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getGearDamageVar: state => {
    const c = state.gearSlot;
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else {
      return Number(c.damageVar.split(',')[state.gearEnh]);
    }
  },
  getOsDamageVar: state => {
    const c = state.osSlot;
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else {
      return Number(c.damageVar.split(',')[state.osEnh]);
    }
  },
  getDamageVar: (state, getters) => {
    const c1 = getters.getChip1DamageVar;
    const c2 = getters.getChip2DamageVar;
    const g = getters.getGearDamageVar;
    return c1 + c2 + g;
  },
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
