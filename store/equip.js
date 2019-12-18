// 아이템 계산, 아이템 데이터
import { CONST } from "~/static/const";
const EQUIPMENT = require("~/static/equipment.json");
export const state = () => ({
  chipF: [],
  chipFEnh: 10,
  chipS: [],
  chipSEnh: 10,
  os: [0],
  osEnh: 10,
  gear: [0],
  gearEnh: 10
});

export const getters = {
  getEquipmentData: () => EQUIPMENT, // Get JSON
  getChipData: (state, getters) => {
    var data_filter = getters.getEquipmentData.filter( element => element.part == "chip");
    return data_filter;
  },
  // Chip slot
  // TODO: 최적화 필요함
  getChipFDamage: state => {
    const chipF = state.chipF;
    // 장착한 chip이 없을경우 (선택값 없을 경우 에러 방지)
    if (chipF == 0) {
      return 0;
    } else if (chipF.damage == undefined) {
      return 0;
    } else if (chipF.damage != undefined) {
      return chipF.damage[state.chipFEnh - 1];
    }
  },
  getChipSDamage: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.damage == undefined) {
      return 0;
    } else if (chipS.damage != undefined) {
      return chipS.damage[state.chipSEnh - 1];
    }
  },
  getChipFHit: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.hit == undefined) {
      return parseInt(0);
    } else if (chipF.hit != undefined) {
      return chipF.hit[state.chipFEnh - 1];
    }
  },
  getChipSHit: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.hit == undefined) {
      return parseInt(0);
    } else if (chipS.hit != undefined) {
      return chipS.hit[state.chipSEnh - 1];
    }
  },
  getChipFCrit: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.crit == undefined) {
      return parseInt(0);
    } else if (chipF.crit != undefined) {
      return chipF.crit[state.chipFEnh - 1];
    }
  },
  getChipSCrit: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.crit == undefined) {
      return parseInt(0);
    } else if (chipS.crit != undefined) {
      return chipS.crit[state.chipSEnh - 1];
    }
  },
  getChipFHealth: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.health == undefined) {
      return parseInt(0);
    } else if (chipF.health != undefined) {
      return chipF.health[state.chipFEnh - 1];
    }
  },
  getChipSHealth: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.health == undefined) {
      return parseInt(0);
    } else if (chipS.health != undefined) {
      return chipS.health[state.chipSEnh - 1];
    }
  },
  getChipFDefense: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.defense == undefined) {
      return parseInt(0);
    } else if (chipF.defense != undefined) {
      return chipF.defense[state.chipFEnh - 1];
    }
  },
  getChipSDefense: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.defense == undefined) {
      return parseInt(0);
    } else if (chipS.defense != undefined) {
      return chipS.defense[state.chipSEnh - 1];
    }
  },
  getChipFDodge: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.dodge == undefined) {
      return parseInt(0);
    } else if (chipF.dodge != undefined) {
      return chipF.dodge[state.chipFEnh - 1];
    }
  },
  getChipSDodge: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.dodge == undefined) {
      return parseInt(0);
    } else if (chipS.dodge != undefined) {
      return chipS.dodge[state.chipSEnh - 1];
    }
  },
  getChipFAP: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.ap == undefined) {
      return parseInt(0);
    } else if (chipF.ap != undefined) {
      return chipF.ap[state.chipFEnh - 1];
    }
  },
  getChipSAP: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.ap == undefined) {
      return parseInt(0);
    } else if (chipS.ap != undefined) {
      return chipS.ap[state.chipSEnh - 1];
    }
  },
  // 일단은 칩 장착만 적용
  // store/enhance 로 넘어가서 최종 계산
  getDamage: (state, getters) => {
    return getters.getChipFDamage + getters.getChipSDamage;
  },
  // 적중 : 합연산이라 os 장비 다 더해도 됨
  getHit: (state, getters) => {
    return getters.getChipFHit + getters.getChipSHit;
  },
  // 치명 : 합연산이라 os 장비 다 더해도 됨
  getCrit: (state, getters) => {
    return getters.getChipFCrit + getters.getChipSCrit;
  },
  getHealth: (state, getters) => {
    return getters.getChipFHealth + getters.getChipSHealth;
  },
  getDefense: (state, getters) => {
    return getters.getChipFDefense + getters.getChipSDefense;
  },
  // 합연산이라 os 장비 다 더해도 됨
  getDodge: (state, getters) => {
    return getters.getChipFDodge + getters.getChipSDodge;
  },
  getAP: (state, getters) => {
    return getters.getChipFAP + getters.getChipSAP;
  }
};

export const mutations = {
  // 아이템 장착
  SET_CHIP_F(state, chipF) {
    state.chipF = chipF;
  },
  // 강화 수치
  SET_CHIP_F_ENH(state, chipFEnh) {
    state.chipFEnh = chipFEnh;
  },
  SET_CHIP_S(state, chipS) {
    state.chipS = chipS;
  },
  SET_CHIP_S_ENH(state, chipSEnh) {
    state.chipSEnh = chipSEnh;
  },
  SET_OS(state, os) {
    state.os = os;
  },
  SET_OS_ENH(state, osEnh) {
    state.osEnh = osEnh;
  },
  SET_GEAR(state, gear) {
    state.gear = gear;
  },
  SET_GEAR_ENH(state, gearEnh) {
    state.gearEnh = gearEnh;
  }
};
