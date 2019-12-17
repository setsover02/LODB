// 레벨, 강화 포인트, 링크 보너스 계산
import { CONST } from "~/static/const";
export const state = () => ({
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
  fullLinkBonus: ""
});

export const getters = {
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
      "버프/디버프 + " + data.fullLinkBuff + "레벨",
      "사거리 + " + data.fullLinkRange
    ];
  }
};

export const mutations = {
  SET_CHARACTER_SELECT(state, characterSelect) {
    state.characterSelect = characterSelect;
    // selectNode("m" + payload, true);
  }, // 레벨 및 강화스텟 업데이트
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
  }
};
