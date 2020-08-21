// LODB 2.0 Character store
// 01 구글 시트 데이터 받아옴
// 02 FormSelect 변이
// 03 캐릭터 데이터 포맷, 내보내기

import {CONST} from '~/static/const';
export const state = () => ({
  characterData: [],
  characterRank: [],
  characterSelect: [0], // require default value
});

const axios = require('axios');
const _ = require('lodash');

export const actions = {
  // Get Google Sheet data
  // 01: characterBase sheet
  async asyncCharacterBase({commit}) {
    let sheetName = 'characterBase';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheetName}!A1:AQ1000?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_CHARACTERS_DATA', articles);
  },

  // 02: characterRank sheet
  async asyncCharacterRank({commit}) {
    let sheetName = 'characterRank';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheetName}!A1:AM300?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_CHARACTERS_RANK', articles);
  },
};

export const mutations = {
  // Google Sheet
  SET_CHARACTERS_DATA(state, payload) {
    state.characterData = payload;
  },
  SET_CHARACTERS_RANK(state, payload) {
    state.characterRank = payload;
  },
  // FormSelect
  SET_CHARACTERS_SELECT(state, characterSelect) {
    state.characterSelect = characterSelect;
  },
};

export const getters = {
  getCharacterId: state => {
    if (state.characterSelect.id === undefined) {
      return 'undefined'; // undefined.png 반환
    } else {
      return state.characterSelect.id;
    }
  },

  // TODO: 승급관련 테이블 작성후 재작업
  getCharacterRank: state => {
    return [state.characterSelect.rankSS, state.characterSelect.rankS, state.characterSelect.rankA, state.characterSelect.rankB];
  },

  // Get full link bonus
  getFullLinkRes: state => {
    // CONST: call text
    return CONST.FULL_LINK_BONUS.RES + state.characterSelect.fullLinkRes;
  },

  getFullLinkSpeed: state => {
    return CONST.FULL_LINK_BONUS.SPEED + state.characterSelect.fullLinkSpeed;
  },

  getFullLinkAcc: state => {
    if (state.characterSelect.fullLinkAcc == 0) {
      return null;
    } else {
      // CONST: call text
      return CONST.FULL_LINK_BONUS.ACC + state.characterSelect.fullLinkAcc + '%';
    }
  },

  getFullLinkSkill: state => {
    return CONST.FULL_LINK_BONUS.SKILL + state.characterSelect.fullLinkSkill * 100 + '%';
  },

  getFullLinkCrit: state => {
    if (state.characterSelect.fullLinkCrit == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.CRIT + state.characterSelect.fullLinkCrit + '%';
    }
  },
  getFullLinkEva: state => {
    if (state.characterSelect.fullLinkEva == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.EVA + state.characterSelect.fullLinkEva + '%';
    }
  },
  getFullLinkHealth: state => {
    if (state.characterSelect.fullLinkHealth == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.HEALTH + state.characterSelect.fullLinkHealth * 100 + '%';
    }
  },
  getFullLinkBuff: state => {
    if (state.characterSelect.fullLinkBuff == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.BUFF + state.characterSelect.fullLinkBuff + '레벨';
    }
  },
  getFullLinkRange: state => {
    if (state.characterSelect.fullLinkRange == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.RANGE + state.characterSelect.fullLinkRange;
    }
  },
};
