// 랭크, 레벨, 강화(포인트) 폼 입력값 변이

import {CONST} from '~/static/const';
export const state = () => ({
  rankChip: CONST.RANK,
  level: 1, // 레벨 설정
  rank: 'SS',
  pointDamage: 0, // * 1.5
  pointHealth: 0, // * 8
  pointDefense: 0, // * 1.5
  pointAcc: 0, // * 1.5%
  pointCrit: 0, // * 0.4%
  pointEva: 0, // * 0.4%
});

export const getters = {
  getRankItems: (state, getters, rootState, rootGetters) => {
    const list = [
      rootGetters['data/getRankSS'],
      rootGetters['data/getRankS'],
      rootGetters['data/getRankA'],
      rootGetters['data/getRankB']
    ];
    return list.filter(element => element !== null);
  },
  getRemainingPoint: state => {
    return parseInt(state.level) * 3 - (state.pointDamage + state.pointHealth + state.pointDefense + state.pointAcc + state.pointCrit + state.pointEva);
  },
};

export const mutations = {
  SET_LEVEL(state, level) {
    state.level = level;
  },
  SET_RANK(state, rank) {
    state.rank = rank;
  },
  SET_POINT_DAMAGE(state, response) {
    state.pointDamage = parseInt(response);
  },
  SET_POINT_HEALTH(state, response) {
    state.pointHealth = parseInt(response);
  },
  SET_POINT_DEFENSE(state, response) {
    state.pointDefense = parseInt(response);
  },
  SET_POINT_ACC(state, response) {
    state.pointAcc = parseInt(response);
  },
  SET_POINT_CRIT(state, response) {
    state.pointCrit = parseInt(response);
  },
  SET_POINT_EVA(state, response) {
    state.pointEva = parseInt(response);
  },
};
