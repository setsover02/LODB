// 아이템 계산, 아이템 데이터
import { CONST } from "~/static/const";
const EQUIPMENT = require("~/static/equipment.json");
export const state = () => ({
  chip1: [0],
  chip1Enh: 10,
  chip2: null,
  os: null,
  gear: null
});

export const getters = {
  getEquipmentData: () => EQUIPMENT, // Get JSON

  // Chip slot
  getChip1: state => {
    const data = state.chip1;
    // 선택 값이 없을 경우 0 반환
    if (data == 0 || data.damage == null) {
      return 0;
    } else {
      return data.damage[state.chip1Enh - 1];
    }
    // return data.rank
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
  }
};
