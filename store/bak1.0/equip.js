// 아이템 계산, 아이템 데이터
import { CONST } from "~/static/const";
const EQUIPMENT = require("~/static/equipment.json");
export const state = () => ({
  chipF: [],
  chipFEnh: 10,
  chipS: [],
  chipSEnh: 10,
  os: [],
  osEnh: 10,
  gear: [],
  gearEnh: 10
});

export const getters = {
  getEquipmentData: () => EQUIPMENT, // Get JSON
  // equipment.json 에서 chip만 가져오기
  getChipData: (state, getters) => {
    var data_filter = getters.getEquipmentData.filter(
      element => element.part == "chip"
    );
    return data_filter;
  },
  getOsData: (state, getters) => {
    var data_filter = getters.getEquipmentData.filter(
      element => element.part == "os"
    );
    return data_filter;
  },
  getGearData: (state, getters) => {
    var data_filter = getters.getEquipmentData.filter(
      element => element.part == "gear"
    );
    return data_filter;
  },
  // Chip slot
  // TODO: 최적화 필요함
  getChipFDamage: state => {
    const chipF = state.chipF;
    // 장착한 chip이 없을경우 (선택값 없을 경우 에러 방지)
    if (chipF == 0) {
      return 0;
    } else if (chipF.damage == undefined || chipF.damage == "") {
      return 0;
    } else if (chipF.damage != undefined) {
      return chipF.damage[state.chipFEnh];
    }
  },
  getChipSDamage: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.damage == undefined || chipS.damage == "") {
      return 0;
    } else if (chipS.damage != undefined) {
      return chipS.damage[state.chipSEnh];
    }
  },
  getChipFHit: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.hit == undefined || chipF.hit == "") {
      return 0;
    } else if (chipF.hit != undefined) {
      return chipF.hit[state.chipFEnh];
    }
  },
  getChipSHit: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.hit == undefined || chipS.hit == "") {
      return 0;
    } else if (chipS.hit != undefined) {
      return chipS.hit[state.chipSEnh];
    }
  },
  getChipFCrit: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.crit == undefined || chipF.crit == "") {
      return 0;
    } else if (chipF.crit != undefined) {
      return chipF.crit[state.chipFEnh];
    }
  },
  getChipSCrit: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.crit == undefined || chipS.crit == "") {
      return 0;
    } else if (chipS.crit != undefined) {
      return chipS.crit[state.chipSEnh];
    }
  },
  getChipFHealth: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.health == undefined || chipF.health == "") {
      return 0;
    } else if (chipF.health != undefined) {
      return chipF.health[state.chipFEnh];
    }
  },
  getChipSHealth: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.health == undefined || chipS.health == "") {
      return 0;
    } else if (chipS.health != undefined) {
      return chipS.health[state.chipSEnh];
    }
  },
  getChipFDefense: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.defense == undefined || chipF.defense == "") {
      return 0;
    } else if (chipF.defense != undefined) {
      return chipF.defense[state.chipFEnh];
    }
  },
  getChipSDefense: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.defense == undefined || chipS.defense == "") {
      return 0;
    } else if (chipS.defense != undefined) {
      return chipS.defense[state.chipSEnh];
    }
  },
  getChipFDodge: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.dodge == undefined || chipF.dodge == "") {
      return 0;
    } else if (chipF.dodge != undefined) {
      return chipF.dodge[state.chipFEnh];
    }
  },
  getChipSDodge: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.dodge == undefined || chipS.dodge == "") {
      return 0;
    } else if (chipS.dodge != undefined) {
      return chipS.dodge[state.chipSEnh];
    }
  },
  getChipFAP: state => {
    const chipF = state.chipF;
    if (chipF == 0) {
      return 0;
    } else if (chipF.ap == undefined || chipF.ap == "") {
      return 0;
    } else if (chipF.ap == Array.isArray) {
      return chipF.ap[state.chipFEnh];
    } else {
      return chipF.ap;
    }
  },
  getChipSAP: state => {
    const chipS = state.chipS;
    if (chipS == 0) {
      return 0;
    } else if (chipS.ap == undefined || chipS.ap == "") {
      return 0;
    } else if (chipS.ap == Array.isArray) {
      return chipS.ap[state.chipSEnh];
    } else {
      return chipS.ap;
    }
  },
  // OS 착용 스탯
  getOsDamage: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.damage == undefined || os.damage == "") {
      return 0;
    } else if (os.damage != undefined) {
      return os.damage[state.osEnh];
    }
  },
  getOsHit: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.hit == undefined || os.hit == "") {
      return 0;
    } else if (os.hit != undefined) {
      return os.hit[state.osEnh];
    }
  },
  getOsCrit: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.crit == undefined || os.crit == "") {
      return 0;
    } else if (os.crit != undefined) {
      return os.crit[state.osEnh];
    }
  },
  getOsDefense: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.defense == undefined || os.defense == "") {
      return 0;
    } else if (os.defense != undefined) {
      return os.defense[state.osEnh];
    }
  },
  getOsDodge: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.dodge == undefined || os.dodge == "") {
      return 0;
    } else if (os.dodge != undefined) {
      return os.dodge[state.osEnh];
    }
  },
  getOsAP: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.ap == undefined || os.ap == "") {
      return 0;
    } else if (os.ap != undefined) {
      return os.ap[state.osEnh];
    }
  },
  // 피해감소
  getOsReduce: state => {
    const os = state.os;
    if (os == 0) {
      return 0;
    } else if (os.reduce == undefined || os.reduce == "") {
      return 0;
    } else if (os.reduce != undefined) {
      return os.reduce[state.osEnh];
    }
  },
  // 장비(gear) 착용 스탯
  getGearDamage: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0;
    } else if (gear.damage == undefined || gear.damage == "") {
      return 0;
    } else if (gear.damage != undefined) {
      return gear.damage[state.gearEnh];
    }
  },
  getGearHit: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0;
    } else if (gear.hit == undefined || gear.hit == "") {
      return 0;
    } else if (gear.hit != undefined) {
      return gear.hit[state.gearEnh];
    }
  },
  getGearCrit: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0;
    } else if (gear.crit == undefined || gear.crit == "") {
      return 0;
    } else if (gear.crit != undefined) {
      return gear.crit[state.gearEnh];
    }
  },
  getGearDodge: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0;
    } else if (gear.dodge == undefined || gear.dodge == "") {
      return 0;
    } else if (gear.dodge == Array.isArray) {
      return gear.dodge[state.gearEnh];
    } else {
      return gear.dodge;
    }
  },
  // 방관
  getGearPenetration: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0;
    } else if (gear.penetration == undefined || gear.penetration == "") {
      return 0;
    } else if (gear.penetration != undefined) {
      return gear.penetration[state.gearEnh];
    }
  },
  // 냉저 계산
  getFrostResist: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0 + "%";
    } else if (gear.frostResist == undefined || gear.frostResist == "") {
      return 0 + "%";
    } else if (gear.frostResist != undefined) {
      return (gear.frostResist[state.gearEnh] * 100).toFixed(1) + "%";
    }
  },
  // 화저 계산
  getFireResist: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0 + "%";
    } else if (gear.fireResist == undefined || gear.fireResist == "") {
      return 0 + "%";
    } else if (gear.fireResist != undefined) {
      return (gear.fireResist[state.gearEnh] * 100).toFixed(1) + "%";
    }
  },
  // 전기저항 계산
  getElecResist: state => {
    const gear = state.gear;
    if (gear == 0) {
      return 0 + "%";
    } else if (gear.elecResist == undefined || gear.elecResist == "") {
      return 0 + "%";
    } else if (gear.elecResist != undefined) {
      return (gear.elecResist[state.gearEnh] * 100).toFixed(1) + "%";
    }
  },

  // store/enhance 로 넘어가서 최종 계산
  getDamage: (state, getters) => {
    return getters.getChipFDamage + getters.getChipSDamage;
  },
  // 적중 : 합연산이라 os 장비 다 더해도 됨
  getHit: (state, getters) => {
    return (
      getters.getChipFHit +
      getters.getChipSHit +
      getters.getOsHit +
      getters.getGearHit
    );
  },
  // 치명 : 합연산이라 os 장비 다 더해도 됨
  getCrit: (state, getters) => {
    return (
      getters.getChipFCrit +
      getters.getChipSCrit +
      getters.getOsCrit +
      getters.getGearCrit
    );
  },
  getHealth: (state, getters) => {
    return getters.getChipFHealth + getters.getChipSHealth;
  },
  getDefense: (state, getters) => {
    return getters.getChipFDefense + getters.getChipSDefense;
  },
  // 합연산이라 os 장비 다 더해도 됨
  getDodge: (state, getters) => {
    return (
      getters.getChipFDodge +
      getters.getChipSDodge +
      getters.getOsDodge +
      getters.getGearDodge
    );
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
