// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  getRankSpeed: (state, getters, rootState, rootGetters) => {
    const r = rootState.enhance.rank;
    const ss = Number(rootState.data.characterSelect.ssSpeed);
    const s = Number(rootState.data.characterSelect.sSpeed);
    const a = Number(rootState.data.characterSelect.aSpeed);
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
  getChip1Speed: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.speed || '').split(', ');
    if (c == 0 || c.speed == undefined || c.speed == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Speed: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.speed || '').split(', ');
    if (c == 0 || c.speed == undefined || c.speed == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearSpeed: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.speed || '').split(', ');
    if (c == 0 || c.speed == undefined || c.speed == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentSpeed: (state, getters) => {
    return getters.getChip1Speed + getters.getChip2Speed + getters.getGearSpeed;
  },

  getOsSpeedVar: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.speedVar || '').split(', ');
    if (c == 0 || c.speedVar == undefined || c.speedVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearSpeedVar: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.speedVar || '').split(', ');
    if (c == 0 || c.speedVar == undefined || c.speedVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentSpeedVar: (state, getters) => {
    return 1 + (getters.getOsSpeedVar + getters.getGearSpeedVar);
  },
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getSpeed: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.speed) + getters.getRankSpeed;
    const l = Number(rootState.data.characterSelect.linkSpeed * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkSpeed);
    const eq = getters.getEquipmentSpeed;
    const F = b + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '행동력 0.10' || rootState.link.fullLinkBonus == '행동력 0.15' || rootState.link.fullLinkBonus == '행동력 0.20') {
      return (F + f).toFixed(3);
    } else {
      return F.toFixed(3);
    }
  },
  getSpeedBuff: (state, getters) => {
    const skillBuff = 0;
    return (getters.getSpeed * getters.getEquipmentSpeedVar + skillBuff).toFixed(3);
  },
};
