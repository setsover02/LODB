// 사거리
export const getters = {
  getOsRange: (state, getters, rootState) => {
    const c = rootState.equipment.osSlot;
    const e = rootState.equipment.osEnh;
    const v = (c.range || '').split(', ');
    if (c == 0 || c.range == undefined || c.range == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getGearRange: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.range || '').split(', ');
    if (c == 0 || c.range == undefined || c.range == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
	},
	getRange: (state, getters, rootState, rootGetters) => {
		const skillBuff = 0;
		const F = getters.getOsRange + getters.getGearRange + skillBuff
		if (rootState.link.fullLinkBonus == "사거리 +1") {
			return (1 + F)
		} else {
			return F
		}
  },
  
  // 사거리감소 해제
  getGearRangeRel: (state, getters, rootState) => {
    const c = rootState.equipment.gearSlot;
    const e = rootState.equipment.gearEnh;
    const v = (c.rangeRel || '').split(', ');
    if (c == 0 || c.rangeRel == undefined || c.rangeRel == '') {
      return 0;
    } else if (isNaN(v[e])) {
      return Number(v[0]);
    } else {
      return Number(v[e]);
    }
  },
  getRangeRelBuff: (state, getters) => {
    return (100 * (getters.getGearRangeRel)).toFixed(1) + '%';
  },
};
