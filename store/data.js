// LODB 2.0 Character store
// 01 구글 시트 데이터 받아옴
// 02 FormSelect 변이
// 03 캐릭터 데이터 포맷, 내보내기

import {CONST} from '~/static/const';
export const state = () => ({
  characterData: [],
  characterSelect: [0], // require default value
  charactersCol: [
    // REVIEW: Sorting 기능이 계산식 적용될 경우에도 item 데이터에 맞추어 정렬됨
    {text: '번호', align: 'right', sortable: true, value: 'id'},
    {text: '아바타', sortable: false, value: 'avatar'},
    {text: '이름', sortable: true, value: 'name'},
    {text: '스쿼드', sortable: true, value: 'squad'},
    {text: '회사', sortable: true, value: 'company'},
    {text: '키(cm)', align: 'right', sortable: true, value: 'height'},
    {text: '무게(kg)', align: 'right', sortable: true, value: 'weight'},
    {text: '나이(만)', align: 'right', sortable: true, value: 'age'},
    {text: '제조국', sortable: true, value: 'madeIn'},
    {text: '전투스타일', sortable: false, value: 'battleStyle'},
    {text: '무기', sortable: false, value: 'weapon'},
  ],
});

const axios = require('axios');
const _ = require('lodash');

// https://sheets.googleapis.com/v4/spreadsheets/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/values/characterBase!A1:AQ1000?key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To
export const actions = {
  // Get Google Sheet data
  // 01: characterBase sheet
  async asyncCharacterBase({commit}) {
    let sheetName = 'characterBase';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheetName}!A1:BR1000?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_CHARACTERS_DATA', articles);
  },
};

export const mutations = {
  // Google Sheet
  SET_CHARACTERS_DATA(state, payload) {
    state.characterData = payload;
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
  getRankSS: state => {
    if (state.characterSelect.ss == 'TRUE') {
      return 'SS';
    } else {
      return null;
    }
  },

  getRankS: state => {
    if (state.characterSelect.s == 'TRUE') {
      return 'S';
    } else {
      return null;
    }
  },

  getRankA: state => {
    if (state.characterSelect.a == 'TRUE') {
      return 'A';
    } else {
      return null;
    }
  },
  getRankB: state => {
    if (state.characterSelect.b == 'TRUE') {
      return 'B';
    } else {
      return null;
    }
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
