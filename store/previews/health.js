import {CONST} from '~/static/const';

export const getters = {
  // 칩, 장비 체력 데이터 불러옴
  getChip1Health: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.health || '').split(', ');
    if (c == 0 || c.health == undefined || c.health == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Health: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.health || '').split(', ');
    if (c == 0 || c.health == undefined || c.health == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsHealth: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.health || '').split(', ');
    if (c == 0 || c.health == undefined || c.health == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearHealth: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.health || '').split(', ');
    if (c == 0 || c.health == undefined || c.health == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentHealth: (state, getters) => {
    return 1 + (getters.getChip1Health + getters.getChip2Health + getters.getOsHealth + getters.getGearHealth);
  },
  // 버프를 제외한 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다.
  getHealth: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.healthBase);
    const c = Number(rootState.data.characterSelect.healthCoef);
    const l = Number(1 + rootState.data.characterSelect.linkHealth * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkHealth);
    const p = rootState.enhance.pointHealth * CONST.ENH.HEALTH;
    const eq = getters.getEquipmentHealth;
    const F = (b + (rootState.enhance.level - 1) * c + p + eq) * l; // final
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '체력 20%' || rootState.link.fullLinkBonus == '체력 25%') {
      return Math.floor(F * (1 + f));
    } else {
      return Math.floor(F);
    }
  },
};
