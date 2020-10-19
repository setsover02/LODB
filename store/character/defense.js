import {CONST} from '~/static/const';

export const getters = {
  // rank up
  getRankDefense: (state, getters, rootState, rootGetters) => {
    const r = rootState.enhance.rank;
    const ss = Number(rootState.data.characterSelect.ssDefense);
    const s = Number(rootState.data.characterSelect.sDefense);
    const a = Number(rootState.data.characterSelect.aDefense);
    if (r == 'A') {
      return a;
    } else if (r == 'S') {
      return s + a;
    } else if (r == 'SS') {
      return ss + s + a;
    } else {
      return 0;
    }
  },
  // 칩, 장비 체력 데이터 불러옴
  getChip1Defense: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.defense || '').split(', ');
    if (c == 0 || c.defense == undefined || c.defense == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Defense: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.defense || '').split(', ');
    if (c == 0 || c.defense == undefined || c.defense == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  // OS는 방어력 없음
  // getOsDefense: (state, getters, rootState) => {
  //   const c = rootState.equipment.osSlot;
  //   const e = rootState.equipment.osEnh;
  //   const v = (c.defense || '').split(', ');
  //   if (c == 0 || c.defense == undefined || c.defense == '') {
  //     return 0;
  //   } else if (isNaN(v[e])) {
  //     return Number(v[0]);
  //   } else {
  //     return Number(v[e]);
  //   }
  // },
  getGearDefense: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.defense || '').split(', ');
    if (c == 0 || c.defense == undefined || c.defense == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentDefense: (state, getters) => {
    return getters.getChip1Defense + getters.getChip2Defense + getters.getGearDefense;
  },

  getOsDefenseVar: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.defenseVar || '').split(', ');
    if (c == 0 || c.defenseVar == undefined || c.defenseVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDefenseVar: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.defenseVar || '').split(', ');
    if (c == 0 || c.defenseVar == undefined || c.defenseVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentDefenseVar: (state, getters) => {
    return 1 + (getters.getOsDefenseVar + getters.getGearDefenseVar);
  },
  getDefense: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.defenseBase) + getters.getRankDefense;
    const c = Number(rootState.data.characterSelect.defenseCoef);
    const l = Number(1 + rootState.data.characterSelect.linkDefense * rootGetters['link/getTotalLink']);
    const p = rootState.enhance.pointDefense * CONST.ENH.DEFENSE;
    const eq = getters.getEquipmentDefense; // TODO: 장비로 증가하는 체력
    const F = (b + (rootState.enhance.level - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else {
      return Math.round(F);
    }
  },
  // TODO: 음수값 처리
  getDefenseBuff: (state, getters) => {
    const skillBuff = 0;
    return Math.round(getters.getDefense * getters.getEquipmentDefenseVar + skillBuff);
  },
};