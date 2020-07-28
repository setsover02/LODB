// LODB 2.0 Character Enhance Simulation
// 1. Get SearchForm Object
// 2. FormAdvance
// 3. FormEnhance

import { CONST } from "~/static/const";
export const state = () => ({
  rankChip: CONST.RANK,
  level: 1, // 레벨 설정
  pointDamage: 0, // * 1.5
  pointHealth: 0, // * 8
  pointDefense: 0, // * 1.5
  pointHit: 0, // * 1.5%
  pointCrit: 0, // * 0.4%
  pointDodge: 0, // * 0.4%
  // points: [
  //   {
  //     name: "damage",
  //     input: 0,
  //     suffix: "공격력"
  //   },
  //   {
  //     name: "health",
  //     input: 0,
  //     suffix: "체력"
  //   }
  // ]
});

export const getters = {
  getRemainingPoint: state => {
    return (
      parseInt(state.level) * 3 -
      (state.pointDamage +
        state.pointHealth +
        state.pointDefense +
        state.pointHit +
        state.pointCrit +
        state.pointDodge)
    );
  }
};

export const mutations = {
  SET_LEVEL(state, level) {
    state.level = level;
  },
  // SET_POINT(state, payload) {
  //   state.points[payload.index].input = payload.val;
  // },
  SET_POINT_DAMAGE(state, response) {
    state.pointDamage = parseInt(response);
  },
  SET_POINT_HEALTH(state, response) {
    state.pointHealth = parseInt(response);
  },
  SET_POINT_DEFENSE(state, response) {
    state.pointDefense = parseInt(response);
  },
  SET_POINT_HIT(state, response) {
    state.pointHit = parseInt(response);
  },
  SET_POINT_CRIT(state, response) {
    state.pointCrit = parseInt(response);
  },
  SET_POINT_DODGE(state, response) {
    state.pointDodge = parseInt(response);
  }
};