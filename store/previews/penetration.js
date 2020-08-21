// 방관
export const getters = {
  getGearPenetration: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.penetration || '').split(', ');
    if (c == 0 || c.penetration == undefined || c.penetration == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
	},
	getPenetrationBuff: (state, getters) => {
    const skillBuff = 0;
    return (getters.getGearPenetration + skillBuff);
  },
}