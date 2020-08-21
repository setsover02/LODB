// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  // 칩, 장비 체력 데이터 불러옴
  getChip1Acc: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.acc || '').split(', ');
    if (c == 0 || c.acc == undefined || c.acc == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Acc: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.acc || '').split(', ');
    if (c == 0 || c.acc == undefined || c.acc == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsAcc: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.acc || '').split(', ');
    if (c == 0 || c.acc == undefined || c.acc == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearAcc: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.acc || '').split(', ');
    if (c == 0 || c.acc == undefined || c.acc == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentAcc: (state, getters) => {
    return getters.getChip1Acc + getters.getChip2Acc + getters.getOsAcc + getters.getGearAcc;
  },
  getAcc: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.acc);
    const l = Number(rootState.data.characterSelect.linkAcc * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkAcc);
    const p = rootState.enhance.pointAcc * CONST.ENH.ACC;
    const eq = getters.getEquipmentAcc;
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '적중 75%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  getAccBuff: (state, getters) => {
    return getters.getAcc;
  },

  // 적중 감소 해제
  getOsAccRel: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.accRel || '').split(', ');
    if (c == 0 || c.accRel == undefined || c.accRel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearAccRel: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.accRel || '').split(', ');
    if (c == 0 || c.accRel == undefined || c.accRel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getAccRelBuff: (state, getters) => {
    return (100 * (getters.getOsAccRel + getters.getGearAccRel)).toFixed(1) + '%'
  }
};
