// https://medium.com/locale-ai/architecting-vuex-store-for-large-scale-vue-js-applications-24c36137e251
import { CONST } from "~/static/const";
const CHARACTER = require("~/static/character.json");
const EQUIPMENT = require("~/static/equipment.json");

export const state = () => ({
  characterName: null, // Name Search
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
  characterSelect: [0], // DataTable characterSelect, 빈값으로 할경우 선택된 내용이 없어서 에러
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
  fullLinkBonus: "",
  equipChip1: [0],
  equipChip1Enh: 10,
  equipChip2: null,
  equipOs: null,
  equipGear: null
});

export const getters = {
  getCharactersData: () => CHARACTER, // Get JSON
  getEquipmentData: () => EQUIPMENT,
  // Json Data: DataTable characterSelect row 값 반환 테스트 : 값이 없을경우 텍스트 반환
  // getters > SimulatingForm.vue
  getCharacterId: state => {
    if (state.characterSelect[0].id === undefined) {
      return "undefined";
    } else {
      return state.characterSelect[0].id;
    }
  },
  getCharacterName: state => {
    if (state.characterSelect[0].name === undefined) {
      return "Error";
    } else {
      return state.characterSelect[0].name;
    }
  },
  getCharacterType: state => {
    return state.characterSelect[0].type;
  },
  getCharacterRole: state => {
    return state.characterSelect[0].role;
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
    const data = state.characterSelect[0];
    return Math.round(
      (data.damageBase +
        (state.level - 1) * data.damageCoef +
        state.damageEnh * CONST.ENH.DAMAGE) *
        (1 + data.linkDamage * getters.getTotalLink)
    );
  },
  getCharacterHealth: (state, getters) => {
    const data = state.characterSelect[0];
    const healthFormula =
      (data.healthBase +
        (state.level - 1) * data.healthCoef +
        state.healthEnh * CONST.ENH.HEALTH) *
      (1 + data.linkHealth * getters.getTotalLink);
    if (
      state.fullLinkBonus == "체력 20%" ||
      state.fullLinkBonus == "체력 25%"
    ) {
      return Math.round(healthFormula * (1 + data.fullLinkHealth));
    } else {
      return Math.round(healthFormula);
    }
  },
  getCharacterDefense: (state, getters) => {
    const data = state.characterSelect[0];
    const defenseFormula =
      (data.defenseBase +
        (state.level - 1) * data.defenseCoef +
        state.defenseEnh * CONST.ENH.DEFENSE) *
      (1 + data.linkDefense * getters.getTotalLink);
    return Math.round(defenseFormula);
  },
  // (getters.getSelectedFullLinkBonus == "적중 75%")
  getCharacterHit: (state, getters) => {
    const data = state.characterSelect[0];
    const hitFormula =
      data.hit +
      state.hitEnh * CONST.ENH.HIT +
      data.linkHit * getters.getTotalLink;
    if (state.fullLinkBonus == "적중 75%") {
      return (hitFormula + 75).toFixed(1);
    } else {
      return hitFormula.toFixed(1);
    }
  },
  getCharacterCrit: (state, getters) => {
    const data = state.characterSelect[0];
    const critFomula =
      data.crit +
      state.critEnh * CONST.ENH.CRIT +
      data.linkCrit * getters.getTotalLink;
    if (state.fullLinkBonus == "치명 20%") {
      return (critFomula + data.fullLinkCrit).toFixed(1);
    } else {
      return critFomula.toFixed(1);
    }
  },
  getCharacterDodge: (state, getters) => {
    const data = state.characterSelect[0];
    const dodgeFomula =
      data.dodge +
      state.dodgeEnh * CONST.ENH.DODGE +
      data.linkDodge * getters.getTotalLink;
    if (state.fullLinkBonus == "회피 20%") {
      return (dodgeFomula + data.fullLinkDodge).toFixed(1);
    } else {
      return dodgeFomula.toFixed(1);
    }
  },
  // 풀링보너스 select 박스에 행동력 값이 있을경우 
  getCharacterAP: state => {
    const data = state.characterSelect[0];
    if (
      state.fullLinkBonus == "행동력 0.1" ||
      state.fullLinkBonus == "행동력 0.15" ||
      state.fullLinkBonus == "행동력 0.2"
    ) {
      return (data.ap + data.fullLinkAP).toFixed(3);
    } else {
      return data.ap.toFixed(3);
    }
  },
  // 남은 스탯강화 포인트
  getEnhLimit: state => {
    return (
      parseInt(state.level) * 3 -
      (parseInt(state.damageEnh) +
        parseInt(state.healthEnh) +
        parseInt(state.defenseEnh) +
        parseInt(state.hitEnh) +
        parseInt(state.critEnh) +
        parseInt(state.dodgeEnh))
    );
  },
  // 캐릭터 고유의 풀링크 보너스 selectbox용 배열로 불러오기
  getCharacterFullLinkBonus: state => {
    const data = state.characterSelect[0];
    // const array = (value) => {
    //   if (data.fullLinkRes === !0) return "자원감소 " + data.fullLinkRes;
    // }
    // if (data.fullLinkHit == 0) {
    //   return null;
    // } else {
    //   return "적중 " + data.fullLinkHit + "%";
    // }
    return [
      "자원감소 " + data.fullLinkRes,
      "행동력 " + data.fullLinkAP,
      "스킬피해 " + data.fullLinkSkill * 100 + "%",
      "적중 " + data.fullLinkHit + "%",
      "치명 " + data.fullLinkCrit + "%",
      "회피 " + data.fullLinkDodge + "%",
      "체력 " + data.fullLinkHealth * 100 + "%",
      "방어력 " + data.fullLinkDefense * 100 + "%",
      "버프/디버프 + " + data.fullLinkBuff + "레벨",
      "사거리 + " + data.fullLinkRange
    ];
  },
  getEquipChip1: state => {
    const data = state.equipChip1;
    // 선택 값이 없을 경우 0 반환
    if (data == 0 || data.damage == null) {
      return 0;
    } else {
      return data.damage[state.equipChip1Enh - 1];
    }
    // return data.rank
  }
};

export const mutations = {
  // 이름 검색필터
  SET_SEARCH_NAME(state, characterName) {
    state.characterName = characterName;
  },
  SET_CHARACTER_SELECT(state, characterSelect) {
    state.characterSelect = characterSelect;
    // selectNode("m" + payload, true);
  },
  // 레벨 및 강화스텟 업데이트
  SET_LEVEL(state, level) {
    state.level = level;
  },
  SET_DAMAGE_ENH(state, damageEnh) {
    state.damageEnh = damageEnh;
  },
  SET_HEALTH_ENH(state, healthEnh) {
    state.healthEnh = healthEnh;
  },
  SET_DEFENSE_ENH(state, defenseEnh) {
    state.defenseEnh = defenseEnh;
  },
  SET_HIT_ENH(state, hitEnh) {
    state.hitEnh = hitEnh;
  },
  SET_CRIT_ENH(state, critEnh) {
    state.critEnh = critEnh;
  },
  SET_DODGE_ENH(state, dodgeEnh) {
    state.dodgeEnh = dodgeEnh;
  },
  // 링크 최대치
  SET_LINK_MAX(state) {
    (state.linkSlot1 = 100),
      (state.linkSlot2 = 100),
      (state.linkSlot3 = 100),
      (state.linkSlot4 = 100),
      (state.linkSlot5 = 100);
  },
  // 링크 미니멈
  SET_LINK_MIN(state) {
    (state.linkSlot1 = 0),
      (state.linkSlot2 = 0),
      (state.linkSlot3 = 0),
      (state.linkSlot4 = 0),
      (state.linkSlot5 = 0);
  },
  SET_LINK_SLOT1(state, linkSlot1) {
    state.linkSlot1 = linkSlot1;
  },
  SET_LINK_SLOT2(state, linkSlot2) {
    state.linkSlot2 = linkSlot2;
  },
  SET_LINK_SLOT3(state, linkSlot3) {
    state.linkSlot3 = linkSlot3;
  },
  SET_LINK_SLOT4(state, linkSlot4) {
    state.linkSlot4 = linkSlot4;
  },
  SET_LINK_SLOT5(state, linkSlot5) {
    state.linkSlot5 = linkSlot5;
  },
  // 풀링 보너스 선택값
  SET_FULLLINK_BONUS(state, fullLinkBonus) {
    state.fullLinkBonus = fullLinkBonus;
  },

  // 아이템 장착 관련
  SET_EQUIP_CHIP_1(state, equipChip1) {
    state.equipChip1 = equipChip1;
  },
  // 강화 수치
  SET_EQUIP_CHIP_1_ENH(state, equipChip1Enh) {
    state.equipChip1Enh = equipChip1Enh;
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
