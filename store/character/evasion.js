import {CONST} from '~/static/const';

export const getters = {
  getRankEva: (state, getters, rootState, rootGetters) => {
    const r = rootState.enhance.rank;
    const ss = Number(rootState.data.characterSelect.ssEva);
    const s = Number(rootState.data.characterSelect.sEva);
    const a = Number(rootState.data.characterSelect.aEva);
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
  getChip1Evasion: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.eva || '').split(', ');
    if (c == 0 || c.eva == undefined || c.eva == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Evasion: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.eva || '').split(', ');
    if (c == 0 || c.eva == undefined || c.eva == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsEvasion: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.eva || '').split(', ');
    if (c == 0 || c.eva == undefined || c.eva == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearEvasion: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.eva || '').split(', ');
    if (c == 0 || c.eva == undefined || c.eva == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentEvasion: (state, getters) => {
    return getters.getChip1Evasion + getters.getChip2Evasion + getters.getOsEvasion + getters.getGearEvasion;
  },
  getEva: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.eva) + getters.getRankEva;
    const l = Number(rootState.data.characterSelect.linkEva * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkEva);
    const p = rootState.enhance.pointEva * CONST.ENH.EVA;
    const eq = getters.getEquipmentEvasion; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '회피 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  getEvaBuff: (state, getters) => {
    const skillBuff = 0;
    return getters.getEva;
  },

  // 회피감소해제
  getGearEvaRel: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.evaRel || '').split(', ');
    if (c == 0 || c.evaRel == undefined || c.evaRel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEvaRelBuff: (state, getters) => {
    return (100 * getters.getGearEvaRel).toFixed(1) + '%';
  },
};