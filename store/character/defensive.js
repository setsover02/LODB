// 각종 저항 등 기타 방어적 스탯
export const getters = {
  getOsReduce: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.reduce + '').split(', ');
    if (c == 0 || c.reduce == undefined || c.reduce == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearReduce: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.reduce + '').split(', ');
    if (c == 0 || c.reduce == undefined || c.reduce == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getReduce: (state, getters, rootState) => {
    // const eq = getters.getGearReduce
    // const skillBuff = 0;
    // return (eq).toFixed(1);
    return (100 * (getters.getGearReduce + getters.getOsReduce)).toFixed(1);
  },

  // 효과 저항
  getChip1EffectResist: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.effectResist + '').split(', ');
    if (c == 0 || c.effectResist == undefined || c.effectResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getChip2EffectResist: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.effectResist + '').split(', ');
    if (c == 0 || c.effectResist == undefined || c.effectResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getOsEffectResist: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.effectResist + '').split(', ');
    if (c == 0 || c.effectResist == undefined || c.effectResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearEffectResist: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.effectResist + '').split(', ');
    if (c == 0 || c.effectResist == undefined || c.effectResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEffectResist: (state, getters) => {
    return (100 * (getters.getChip1EffectResist + getters.getChip2EffectResist + getters.getOsEffectResist + getters.getGearEffectResist)).toFixed(1);
	},
	
	  // 효과 해제
  getChip1EffectCancel: (state, getters, rootState) => {
    const c = rootState.equipment.chip1Slot;
    const e = rootState.equipment.chip1Enh;
    const v = (c.effectCancel + '').split(', ');
    if (c == 0 || c.effectCancel == undefined || c.effectCancel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getChip2EffectCancel: (state, getters, rootState) => {
    const c = rootState.equipment.chip2Slot;
    const e = rootState.equipment.chip2Enh;
    const v = (c.effectCancel + '').split(', ');
    if (c == 0 || c.effectCancel == undefined || c.effectCancel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearEffectCancel: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.effectCancel + '').split(', ');
    if (c == 0 || c.effectCancel == undefined || c.effectCancel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getEffectCancel: (state, getters) => {
    return (100 * (getters.getChip1EffectCancel + getters.getChip2EffectCancel + getters.getGearEffectCancel)).toFixed(1);
  },

  getGearFireResist: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.fireResist || '').split(', ');
    if (c == 0 || c.fireResist == undefined || c.fireResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getFireResist: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.fireResist);
    const eq = getters.getGearFireResist;
    const skillBuff = 0;
    return (100 * (b + eq + skillBuff)).toFixed(1);
  },
  getGearFrostResist: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.frostResist || '').split(', ');
    if (c == 0 || c.frostResist == undefined || c.frostResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getFrostResist: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.frostResist);
    const eq = getters.getGearFrostResist;
    const skillBuff = 0;
    return (100 * (b + eq + skillBuff)).toFixed(1);
  },
  getGearElectricResist: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.electricResist || '').split(', ');
    if (c == 0 || c.electricResist == undefined || c.electricResist == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getElectricResist: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.electricResist);
    const eq = getters.getGearElectricResist;
    const skillBuff = 0;
    return (100 * (b + eq + skillBuff)).toFixed(1);
  },
};
