// https://medium.com/locale-ai/architecting-vuex-store-for-large-scale-vue-js-applications-24c36137e251
import { CONST } from "~/static/const";
const CHARACTER = require("~/static/character.json");
const EQUIPMENT = require("~/static/equipment.json");

export const state = () => ({
  name: null, // Name Search
  charactersCol: [
    // REVIEW: Sorting 기능이 계산식 적용될 경우에도 item 데이터에 맞추어 정렬됨
    { text: "번호", align: "right", sortable: false, value: "id" },
    { text: "아바타", sortable: false, value: "avatar" },
    { text: "이름", sortable: true, value: "name" },
    { text: "등급", align: "center", sortable: false, value: "rank" },
    { text: "유형", sortable: false, value: "type" },
    { text: "역할", sortable: false, value: "role" },
    { text: "레벨", align: "right", sortable: false, value: "level" },
    { text: "체력", align: "right", sortable: true, value: "health" },
    { text: "공격력", align: "right", sortable: true, value: "damage" },
    { text: "1스킬", align: "right", sortable: true, value: "skill1" },
    { text: "2스킬", align: "right", sortable: true, value: "skill2" },
    { text: "적중", align: "right", sortable: true, value: "hit" },
    { text: "치명", align: "right", sortable: true, value: "crit" },
    { text: "회피", align: "right", sortable: true, value: "dodge" },
    { text: "방어력", align: "right", sortable: true, value: "defense" },
    { text: "행동력", align: "right", sortable: true, value: "ap" },
    { text: "장비", align: "right", sortable: false, value: "equip" },
    { text: "메모", align: "right", sortable: false, value: "memo" },
    { text: "", align: "right", sortable: false, value: "actions" }
  ],
  selection: [0], // DataTable selection, 빈값으로 할경우 선택된 내용이 없어서 에러
  level: 1, // 레벨 설정
  // 강화 스탯
  damageEnh: 0, // * 1.5
  healthEnh: 0, // * 8
  defenseEnh: 0, // * 1.5
  hitEnh: 0, // * 1.5%
  critEnh: 0, // * 0.4%
  dodgeEnh: 0, // * 0.4%
  // 링크 슬롯
  linkSlotItem: CONST.LINK_SLOT, // 링크 퍼센티지 선택
  linkSlot1: 100,
  linkSlot2: 100,
  linkSlot3: 100,
  linkSlot4: 100,
  linkSlot5: 100,
  fullLinkBonus: "적중 75%"
});

export const getters = {
  character: () => CHARACTER, // Get JSON
  equipment: () => EQUIPMENT,
  // Json Data: DataTable selection row 값 반환 테스트 : 값이 없을경우 텍스트 반환
  // getters > SimulatingForm.vue
  getCharacterId: state => {
    if (state.selection[0].id === undefined) {
      return "undefined";
    } else {
      return state.selection[0].id;
    }
  },
  getCharacterName: state => {
    if (state.selection[0].name === undefined) {
      return "Error";
    } else {
      return state.selection[0].name;
    }
  },
  getCharacterType: state => {
    return state.selection[0].type;
  },
  getCharacterRole: state => {
    return state.selection[0].role;
  },
  // 링크 퍼센티지 합산, 소수점 2자리 // 추후 const값 이랑 중복되는거 정리해야함
  getTotalLink: state => {
    return (
      (state.linkSlot1 +
        state.linkSlot2 +
        state.linkSlot3 +
        state.linkSlot4 +
        state.linkSlot5) /
      100
    );
  },
  // 이하 부터는 강화값 포함하여 반환 (강화, 링크보너스 까지 적용되어 있음)
  // DataTable: Only selected row data > SimulatingForm
  getCharacterDamage: (state, getters) => {
    const data = state.selection[0];
    return (
      Math.round((
        data.damageBase +
          (state.level - 1) * data.damageCoef +
          state.damageEnh * CONST.ENH.DAMAGE
      ) *
      (1 + data.linkDamage * getters.getTotalLink))
    );
  },
  getCharacterHealth: (state, getters) => {
    const data = state.selection[0];
    return (
      Math.round((
        data.healthBase +
          (state.level - 1) * data.healthCoef +
          state.healthEnh * CONST.ENH.HEALTH
      ) *
      (1 + data.linkHealth * getters.getTotalLink))
    );
  },
  getCharacterDefense: (state, getters) => {
    const data = state.selection[0];
    return (
      Math.round((
        data.defenseBase +
          (state.level - 1) * data.defenseCoef +
          state.defenseEnh * CONST.ENH.DEFENSE
      ) *
      (1 + data.linkDefense * getters.getTotalLink))
    );
  },
  getCharacterHit: (state, getters) => {
    const data = state.selection[0];
    return (
      data.hit +
      state.hitEnh * CONST.ENH.HIT +
      data.linkHit * getters.getTotalLink
    ).toFixed(1);
  },
  getCharacterCrit: (state, getters) => {
    const data = state.selection[0];
    return (
      data.crit +
      state.critEnh * CONST.ENH.CRIT +
      data.linkCrit * getters.getTotalLink
    ).toFixed(1);
  },
  getCharacterDodge: (state, getters) => {
    const data = state.selection[0];
    return (
      data.dodge +
      state.dodgeEnh * CONST.ENH.DODGE +
      data.linkDodge * getters.getTotalLink
    ).toFixed(1);
  },
  // 남은 스탯강화 포인트
  enhTotalLimit: state => {
    return (
      parseInt(state.level) * 3 -
      (parseInt(state.damageEnh) +
        parseInt(state.healthEnh) +
        parseInt(state.defenseEnh) +
        parseInt(state.hitEnh) +
        parseInt(state.critEnh) +
        parseInt(state.dodgeEnh))
    );
  }
};

export const mutations = {
  // 이름 검색필터
  searchName(state, name) {
    state.name = name;
  },
  updateSelection(state, selection) {
    state.selection = selection;
    // selectNode("m" + payload, true);
  },
  // 레벨 및 강화스텟 업데이트
  updateLevel(state, level) {
    state.level = level;
  },
  updateDamageEnh(state, damageEnh) {
    state.damageEnh = damageEnh;
  },
  updateHealthEnh(state, healthEnh) {
    state.healthEnh = healthEnh;
  },
  updateDefenseEnh(state, defenseEnh) {
    state.defenseEnh = defenseEnh;
  },
  updateHitEnh(state, hitEnh) {
    state.hitEnh = hitEnh;
  },
  updateCritEnh(state, critEnh) {
    state.critEnh = critEnh;
  },
  updateDodgeEnh(state, dodgeEnh) {
    state.dodgeEnh = dodgeEnh;
  },
  // 링크 최대치
  updateMaxLink(state) {
    (state.linkSlot1 = 100),
      (state.linkSlot2 = 100),
      (state.linkSlot3 = 100),
      (state.linkSlot4 = 100),
      (state.linkSlot5 = 100);
  },
  // 링크 미니멈
  updateMinLink(state) {
    (state.linkSlot1 = 0),
      (state.linkSlot2 = 0),
      (state.linkSlot3 = 0),
      (state.linkSlot4 = 0),
      (state.linkSlot5 = 0);
  },
  updateLinkSlot1(state, linkSlot1) {
    state.linkSlot1 = linkSlot1;
  },
  updateLinkSlot2(state, linkSlot2) {
    state.linkSlot2 = linkSlot2;
  },
  updateLinkSlot3(state, linkSlot3) {
    state.linkSlot3 = linkSlot3;
  },
  updateLinkSlot4(state, linkSlot4) {
    state.linkSlot4 = linkSlot4;
  },
  updateLinkSlot5(state, linkSlot5) {
    state.linkSlot5 = linkSlot5;
  },
  // 풀링 보너스 선택값
  updateFullLinkBonus(state, fullLinkBonus) {
    state.fullLinkBonus = fullLinkBonus;
  }
};

export const actions = {};

// const setCharacterToStore = () => {
//   axios.get(require("~/data/character.json")).then(response => {
//     store.state("character", response.data.character);
//   });
// };

// // setCharacterToStore()
// export const actions = {
//   async browserInit({ commit }) {
//     const { data } = await axios.get(require("~/data/character.json"));
//     commit("SET_CHARACTERS", data);
//     return dispatch("browserInit");
//   }
// };
