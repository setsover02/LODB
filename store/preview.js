// 캐릭터 시뮬레이션 최종 계산식

import { CONST } from "~/static/const";

export const getters = {
  // enhance.js 의 레벨값을 받아온다
  getLevel: (state, getters, rootState) => {
    return rootState.enhance.level;
  },
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getHealth: (state, getters, rootState, rootGetters) => {
    const healthBase = Number(rootState.data.characterSelect.healthBase);
    const healthCoef = Number(rootState.data.characterSelect.healthCoef);
    const linkHealth = Number(
      1 +
        rootState.data.characterSelect.linkHealth *
          rootGetters["link/getTotalLink"]
    );
    const fullLinkHealth = Number(
      rootState.data.characterSelect.fullLinkHealth
    );
    const pointHealth = rootState.enhance.pointHealth * CONST.ENH.HEALTH;
    const equipHealth = 0; // TODO: 장비로 증가하는 체력
    const final =
      (healthBase +
        (getters.getLevel - 1) * healthCoef +
        pointHealth +
        equipHealth) *
      linkHealth;
    if (healthBase == undefined || healthBase == null) {
      return "Not Load";
    } else if (
      rootState.link.fullLinkBonus == "체력 20%" ||
      rootState.link.fullLinkBonus == "체력 25%"
    ) {
      return Math.round(final * (1 + fullLinkHealth));
    } else {
      return Math.round(final);
    }
  },
  getDefense: (state, getters, rootState, rootGetters) => {
    const defenseBase = Number(rootState.data.characterSelect.defenseBase);
    const defenseCoef = Number(rootState.data.characterSelect.defenseCoef);
    const linkDefense = Number(
      1 +
        rootState.data.characterSelect.linkDefense *
          rootGetters["link/getTotalLink"]
    );
    const pointDefense = rootState.enhance.pointDefense * CONST.ENH.DEFENSE;
    const equipDefense = 0; // TODO: 장비로 증가하는 체력
    const final =
      (defenseBase +
        (getters.getLevel - 1) * defenseCoef +
        pointDefense +
        equipDefense) *
      linkDefense;
    if (defenseBase == undefined || defenseBase == null) {
      return "Not Load";
    } else {
      return Math.round(final);
    }
  },
  getEva: (state, getters, rootState, rootGetters) => {
    const eva = Number(rootState.data.characterSelect.eva);
    const linkEva = Number(
      rootState.data.characterSelect.linkEva * rootGetters["link/getTotalLink"]
    );
    const fullLinkEva = Number(rootState.data.characterSelect.fullLinkEva);
    const pointEva = rootState.enhance.pointEva * CONST.ENH.EVA;
    const equipEva = 0; // TODO: 장비로 증가하는
    const final = eva + pointEva + linkEva + equipEva;
    if (eva == undefined || eva == null) {
      return "Not Load";
    } else if (rootState.link.fullLinkBonus == "회피 20%") {
      return (final + fullLinkEva).toFixed(1) + "%";
    } else {
      return final.toFixed(1) + "%";
    }
  },
  getSpeed: (state, getters, rootState, rootGetters) => {
    const speed = Number(rootState.data.characterSelect.speed);
    const linkSpeed = Number(
      rootState.data.characterSelect.linkSpeed *
        rootGetters["link/getTotalLink"]
    );
    const fullLinkSpeed = Number(rootState.data.characterSelect.fullLinkSpeed);
    const equipSpeed = 0;
    const final = speed + linkSpeed + equipSpeed;
    if (speed == undefined || speed == null) {
      return "Not Load";
    } else if (
      rootState.link.fullLinkBonus == "행동력 0.10" ||
      rootState.link.fullLinkBonus == "행동력 0.15" ||
      rootState.link.fullLinkBonus == "행동력 0.20"
    ) {
      return (final + fullLinkSpeed).toFixed(3);
    } else {
      return final.toFixed(3);
    }
  }
};
