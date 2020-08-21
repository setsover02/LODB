// 원소저항
export const getters = {
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
    return b + eq + skillBuff;
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
    return b + eq + skillBuff;
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
    return b + eq + skillBuff;
  },
};
