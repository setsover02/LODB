// LODB 2.0 Character Enhance Simulation
// 1. Get SearchForm Object
import { CONST } from "~/static/const";
export const state = () => ({
  rankChip: CONST.RANK,
  level: 1 // 레벨 설정
});

export const getters = {};

export const mutations = {
  SET_LEVEL(state, level) {
    state.level = level;
  }
};
