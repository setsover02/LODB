// 캐릭터 시뮬레이션 최종 계산식

import { CONST } from "~/static/const";

export const getters = {
  // enhance.js 의 레벨값을 받아온다
  getLevel: (state, getters, rootState) => {
    return rootState.enhance.level;
  },
  // getStat 이름을 가진 getter는 강화, 링크, 칩, 보조장비 까지만 합산한다
  getHealth: (state, getters, rootState, rootGetters) => {
    const healthBase = Number(rootState.data.characterSelect.healthBase);
    const healthCoef = Number(rootState.data.characterSelect.healthCoef);
    const linkHealth = Number(rootState.data.characterSelect.linkHealth)
    const pointHealth = rootState.enhance.pointHealth * CONST.ENH.HEALTH
    const equipHealth = 0 // TODO: 장비로 증가하는 체력
    if (healthBase == undefined || healthBase == null) {
      return "Not Load";
    } else {
      return Math.round(
        (healthBase +
          (getters.getLevel - 1) * healthCoef +
          pointHealth +
          equipHealth) *
          (1 + linkHealth * rootGetters["link/getTotalLink"])
      );
    }
  }
};