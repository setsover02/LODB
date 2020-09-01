// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  getRankCrit: (state, getters, rootState, rootGetters) => {
    const r = rootState.enhance.rank;
    const ss = Number(rootState.data.characterSelect.ssCrit);
    const s = Number(rootState.data.characterSelect.sCrit);
    const a = Number(rootState.data.characterSelect.aCrit);
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
  getChip1Crit: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.crit || '').split(', ');
    if (c == 0 || c.crit == undefined || c.crit == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Crit: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.crit || '').split(', ');
    if (c == 0 || c.crit == undefined || c.crit == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsCrit: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.crit || '').split(', ');
    if (c == 0 || c.crit == undefined || c.crit == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearCrit: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.crit || '').split(', ');
    if (c == 0 || c.crit == undefined || c.crit == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentCrit: (state, getters) => {
    return getters.getChip1Crit + getters.getChip2Crit + getters.getOsCrit + getters.getGearCrit;
  },
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getCrit: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.crit) + getters.getRankCrit;
    const l = Number(rootState.data.characterSelect.linkCrit * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkCrit);
    const p = rootState.enhance.pointCrit * CONST.ENH.CRIT;
    const eq = getters.getEquipmentCrit; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '치명 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
  getCritBuff: (state, getters) => {
    const skillBuff = 0;
    return getters.getCrit;
  },
};
