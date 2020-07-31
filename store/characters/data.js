// LODB 2.0 Character store
// 01 Get Google Sheet
// 02 FormSelect Component state
// 03 and export selected character data

import { CONST } from "~/static/const";
export const state = () => ({
  characterData: [],
  characterSelect: [0] // require default value
});

export const mutations = {
  // Google Sheet
  SET_CHARACTERS_DATA(state, payload) {
    state.characterData = payload;
  },
  // FormSelect
  SET_CHARACTERS_SELECT(state, characterSelect) {
    state.characterSelect = characterSelect;
  }
};

export const actions = {
  // Get Google Sheet data
  async asyncData({ commit }) {
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

export const getters = {
  getCharacterId: state => {
    if (state.characterSelect.id === undefined) {
      return "undefined"; // undefined.png 반환
    } else {
      return state.characterSelect.id;
    }
  },

  // TODO: 승급관련 테이블 작성후 재작업
  getCharacterRank: state => {
    return [
      state.characterSelect.rankSS,
      state.characterSelect.rankS,
      state.characterSelect.rankA,
      state.characterSelect.rankB
    ];
  },

  // Get full link bonus
  getFullLinkRes: state => {
    if (state.characterSelect.fullLinkRes == 0) {
      return null;
    } else {
      // CONST: call text
      return CONST.FULL_LINK_BONUS.RES + state.characterSelect.fullLinkRes;
    }
  },

  getFullLinkAp: state => {
    if (state.characterSelect.fullLinkAP == 0) {
      return null;
    } else {
      // CONST: call text
      return CONST.FULL_LINK_BONUS.AP + state.characterSelect.fullLinkAP;
    }
  },

  getFullLinkSKill: state => {
    if (state.characterSelect.fullLinkSkill == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.SKILL +
        state.characterSelect.fullLinkSkill * 100 +
        "%"
      );
    }
  },

  getFullLinkHit: state => {
    if (state.characterSelect.fullLinkHit == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.HIT + state.characterSelect.fullLinkHit + "%"
      );
    }
  },
  getFullLinkCrit: state => {
    if (state.characterSelect.fullLinkCrit == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.CRIT + state.characterSelect.fullLinkCrit + "%"
      );
    }
  },
  getFullLinkDodge: state => {
    if (state.characterSelect.fullLinkDodge == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.DODGE +
        state.characterSelect.fullLinkDodge +
        "%"
      );
    }
  },
  getFullLinkHealth: state => {
    if (state.characterSelect.fullLinkHealth == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.HEALTH + state.characterSelect.fullLinkHealth
      );
    }
  },
  getFullLinkBuff: state => {
    if (state.characterSelect.fullLinkBuff == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.BUFF +
        state.characterSelect.fullLinkBuff +
        "레벨"
      );
    }
  },
  getFullLinkRange: state => {
    if (state.characterSelect.fullLinkRange == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.RANGE + state.characterSelect.fullLinkRange
      );
    }
  }
};
