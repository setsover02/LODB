// 아이템 계산, 아이템 데이터
import { CONST } from "~/static/const";
const EQUIPMENT = require("~/static/equipment.json");
export const state = () => ({
  chip1: [],
  chip1Enh: 10,
  chip2: [],
  chip2Enh: 10,
  os: [0],
  osEnh: 10,
  gear: [0],
  gearEnh: 10
});

export const getters = {
  getEquipmentData: () => EQUIPMENT, // Get JSON
  // Chip slot
  // TODO: getters 합치는 방법 찾아야함
  getChip1Damage: state => {
    const chip1 = state.chip1;
    // 장착한 chip이 없을경우
    if (chip1 == 0) {
      return 0;
    } else if (chip1.damage != null) {
      return chip1.damage[state.chip1Enh - 1];
    }
  },
  getChip2Damage: state => {
    const chip2 = state.chip2;
    if (chip2 == 0) {
      return 0;
    } else if (chip2.damage != null) {
      return chip2.damage[state.chip2Enh - 1];
    }
  },
  getDamage: getters => {
    return Math.floor(getters.getChip1Damage + getters.getChip2Damage)
  },
  getChip1Hit: state => {
    const chip1 = state.chip1;
    // 장착한 chip이 없을경우
    if (chip1 == 0) {
      return 0;
    } else if (chip1.hit != null) {
      return chip1.hit[state.chip1Enh - 1];
    }
  }
};

export const mutations = {
  // 아이템 장착
  SET_CHIP_1(state, chip1) {
    state.chip1 = chip1;
  },
  // 강화 수치
  SET_CHIP_1_ENH(state, chip1Enh) {
    state.chip1Enh = chip1Enh;
  },
  SET_CHIP_2(state, chip2) {
    state.chip2 = chip2;
  },
  SET_CHIP_2_ENH(state, chip2Enh) {
    state.chip2Enh = chip2Enh;
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
