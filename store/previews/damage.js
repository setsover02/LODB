import {CONST} from '~/static/const';

export const getters = {
  getChip1Damage: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.damage || '').split(', ');
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else if (isNaN(v[e])) {
      // 고정값일 경우
      return Number(v[0]);
    } else {
      // 강화에 따라 값이 변경될 경우
      return Number(v[e]);
    }
  },
  getChip2Damage: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.damage || '').split(', ');
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDamage: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.damage || '').split(', ');
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsDamage: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.damage || '').split(', ');
    if (c == 0 || c.damage == undefined || c.damage == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentDamage: (state, getters) => {
    return getters.getChip1Damage + getters.getChip2Damage + getters.getOsDamage + getters.getGearDamage;
  },

  getChip1DamageVar: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.damageVar || '').split(', ');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getChip2DamageVar: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.damageVar || '').split(', ');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsDamageVar: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.damageVar || '').split(', ');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDamageVar: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.damageVar || '').split(', ');
    if (c == 0 || c.damageVar == undefined || c.damageVar == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  // DamageVar는 퍼센티지 값으로 스탯창에서는 표기가 안됨: 버프 취급
  getEquipmentDamageVar: (state, getters) => {
    return 1 + (getters.getChip1DamageVar + getters.getChip2DamageVar + getters.getOsDamageVar + getters.getGearDamageVar);
  },

  // 경장, 중장, 기동 추가피해 (only os, gear)
  getOsDamageVarLight: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.damageVarLight || '').split(', ');
    if (c == 0 || c.damageVarLight == undefined || c.damageVarLight == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDamageVarLight: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.damageVarLight || '').split(', ');
    if (c == 0 || c.damageVarLight == undefined || c.damageVarLight == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsDamageVarHeavy: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.damageVarHeavy || '').split(', ');
    if (c == 0 || c.damageVarHeavy == undefined || c.damageVarHeavy == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDamageVarHeavy: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.damageVarHeavy || '').split(', ');
    if (c == 0 || c.damageVarHeavy == undefined || c.damageVarHeavy == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsDamageVarFlyer: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.damageVarFlyer || '').split(', ');
    if (c == 0 || c.damageVarFlyer == undefined || c.damageVarFlyer == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearDamageVarFlyer: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.damageVarFlyer || '').split(', ');
    if (c == 0 || c.damageVarFlyer == undefined || c.damageVarFlyer == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEquipmentDamageVarLight: (state, getters) => {
    return 100 * (getters.getOsDamageVarLight + getters.getGearDamageVarLight) + '%';
  },
  getEquipmentDamageVarHeavy: (state, getters) => {
    return 100 * (getters.getOsDamageVarHeavy + getters.getGearDamageVarHeavy) + '%';
  },
  getEquipmentDamageVarFlyer: (state, getters) => {
    return 100 * (getters.getOsDamageVarFlyer + getters.getGearDamageVarFlyer) + '%';
  },
  // 버프를 제외한 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getDamage: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.damageBase);
    const c = Number(rootState.data.characterSelect.damageCoef);
    const l = Number(1 + rootState.data.characterSelect.linkDamage * rootGetters['link/getTotalLink']);
    const p = rootState.enhance.pointDamage * CONST.ENH.DAMAGE;
    const eq = getters.getEquipmentDamage;
    const F = (b + (rootState.enhance.level - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else {
      return Math.round(F);
    }
  },
  // Os, 버프가 포함된 최종데미지
  getDamageBuff: (state, getters) => {
    const skillBuff = 0;
    return Math.round(getters.getDamage * getters.getEquipmentDamageVar + skillBuff);
  },
  // 타입별 추가 데미지(실데미지 계산)
  getDamageToLight: (state, getters) => {
    return Math.round(getters.getDamage * (getters.getEquipmentDamageVar + getters.getOsDamageVarLight + getters.getGearDamageVarLight));
  },
  getDamageToHeavy: (state, getters) => {
    return Math.round(getters.getDamage * (getters.getEquipmentDamageVar + getters.getOsDamageVarHeavy + getters.getGearDamageVarHeavy));
  },
  getDamageToFlyer: (state, getters) => {
    return Math.round(getters.getDamage * (getters.getEquipmentDamageVar + getters.getOsDamageVarFlyer + getters.getGearDamageVarFlyer));
  },
};
