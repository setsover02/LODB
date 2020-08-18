// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  // enhance.js 의 레벨값을 받아온다
  getLevel: (state, getters, rootState) => {
    return rootState.enhance.level;
  },
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getHealth: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.healthBase);
    const c = Number(rootState.data.characterSelect.healthCoef);
    const l = Number(1 + rootState.data.characterSelect.linkHealth * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkHealth);
    const p = rootState.enhance.pointHealth * CONST.ENH.HEALTH;
    const eq = 0; // TODO: 장비로 증가하는 체력
    const F = (b + (getters.getLevel - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '체력 20%' || rootState.link.fullLinkBonus == '체력 25%') {
      return Math.round(F * (1 + f));
    } else {
      return Math.round(F);
    }
  },
  getDefense: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.defenseBase);
    const c = Number(rootState.data.characterSelect.defenseCoef);
    const l = Number(1 + rootState.data.characterSelect.linkDefense * rootGetters['link/getTotalLink']);
    const p = rootState.enhance.pointDefense * CONST.ENH.DEFENSE;
    const eq = 0; // TODO: 장비로 증가하는 체력
    const F = (b + (getters.getLevel - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else {
      return Math.round(F);
    }
  },
  getEva: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.eva);
    const l = Number(rootState.data.characterSelect.linkEva * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkEva);
    const p = rootState.enhance.pointEva * CONST.ENH.EVA;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '회피 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  getSpeed: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.speed);
    const l = Number(rootState.data.characterSelect.linkSpeed * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkSpeed);
    const eq = 0;
    const F = b + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '행동력 0.10' || rootState.link.fullLinkBonus == '행동력 0.15' || rootState.link.fullLinkBonus == '행동력 0.20') {
      return (F + f).toFixed(3);
    } else {
      return F.toFixed(3);
    }
  },
  getDamage: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.damageBase);
    const c = Number(rootState.data.characterSelect.damageCoef);
    const l = Number(1 + rootState.data.characterSelect.linkDamage * rootGetters['link/getTotalLink']);
    const p = rootState.enhance.pointDamage * CONST.ENH.DAMAGE;
    const eq = rootGetters["equipment/getDamage"];
    const F = (b + (getters.getLevel - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else {
      return Math.round(F);
    }
  },
  getCrit: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.crit);
    const l = Number(rootState.data.characterSelect.linkCrit * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkCrit);
    const p = rootState.enhance.pointCrit * CONST.ENH.CRIT;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '치명 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  getAcc: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.acc);
    const l = Number(rootState.data.characterSelect.linkAcc * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkAcc);
    const p = rootState.enhance.pointAcc * CONST.ENH.ACC;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '적중 75%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  
  // 이 이하 버프 및 아이템으로 증가하는 스탯
};
