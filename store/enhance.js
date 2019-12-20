// 계산식 참고
// https://gall.dcinside.com/mgallery/board/view/?id=lastorigin&no=337333

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
      return "undefined"; // undefined.png 반환
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
  // 승급가능 랭크 리스트 불러오기
  getRankSS: state => {
    const data = state.characterSelect[0];
    if (data.rankSS == "TRUE") {
      return CONST.RANK.SS;
    } else {
      return null;
    }
  },
  getRankS: state => {
    const data = state.characterSelect[0];
    if (data.rankS == "TRUE") {
      return CONST.RANK.S;
    } else {
      return null;
    }
  },
  getRankA: state => {
    const data = state.characterSelect[0];
    if (data.rankA == "TRUE") {
      return CONST.RANK.A;
    } else {
      return null;
    }
  },
  getRankB: state => {
    const data = state.characterSelect[0];
    if (data.rankB == "TRUE") {
      return CONST.RANK.B;
    } else {
      return null;
    }
  },
  // 승급가능 랭크 리스트 필터링
  getCharacterRankFilters: (state, getters) => {
    const rank = [
      getters.getRankSS,
      getters.getRankS,
      getters.getRankA,
      getters.getRankB
    ];
    // 승급이 없으면 null값 반환하고 null값인 경우 표기하지 않음
    return rank.filter(element => element !== null);
  },
  // 캐릭터 초기 랭크 값 불러오기
  getCharacterCurrentRank: state => {
    const data = state.characterSelect[0];
    if (data.rankB == "TRUE") {
      return "B";
    } else if (data.rankA == "TRUE") {
      return "A";
    } else if (data.rankS == "TRUE") {
      return "S";
    } else {
      return "SS";
    }
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
  // equip 값 가져오려면 rootState, rootGetters 필수
  getCharacterDamage: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    return Math.round(
      (data.damageBase +
        (state.level - 1) * data.damageCoef +
        state.damageEnh * CONST.ENH.DAMAGE +
        rootGetters["equip/getDamage"]) *
        (1 + data.linkDamage * getters.getTotalLink)
    );
  },
  getCharacterHealth: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    const healthFormula =
      (data.healthBase +
        (state.level - 1) * data.healthCoef +
        state.healthEnh * CONST.ENH.HEALTH +
        rootGetters["equip/getHealth"]) *
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
  getCharacterDefense: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    const defenseFormula =
      (data.defenseBase +
        (state.level - 1) * data.defenseCoef +
        state.defenseEnh * CONST.ENH.DEFENSE +
        rootGetters["equip/getDefense"]) *
      (1 + data.linkDefense * getters.getTotalLink);
    return Math.round(defenseFormula);
  },
  // (getters.getSelectedFullLinkBonus == "적중 75%")
  getCharacterHit: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    const hitFormula =
      data.hit +
      state.hitEnh * CONST.ENH.HIT +
      data.linkHit * getters.getTotalLink +
      rootGetters["equip/getHit"];
    if (state.fullLinkBonus == "적중 75%") {
      return (hitFormula + 75).toFixed(1);
    } else {
      return hitFormula.toFixed(1);
    }
  },
  getCharacterCrit: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    const critFomula =
      data.crit +
      state.critEnh * CONST.ENH.CRIT +
      data.linkCrit * getters.getTotalLink +
      rootGetters["equip/getCrit"];
    if (state.fullLinkBonus == "치명 20%") {
      return (critFomula + data.fullLinkCrit).toFixed(1);
    } else {
      return critFomula.toFixed(1);
    }
  },
  // TODO: 소수점 0으로 처리됨 버그임
  getCharacterDodge: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    const dodgeFomula = (
      data.dodge +
      state.dodgeEnh * CONST.ENH.DODGE +
      data.linkDodge * getters.getTotalLink +
      rootGetters["equip/getDodge"]
    ).toFixed(1);
    if (state.fullLinkBonus == "회피 20%") {
      return dodgeFomula + data.fullLinkDodge;
    } else {
      return dodgeFomula;
    }
  },
  // 풀링보너스 select 박스에 행동력 값이 있을경우
  getCharacterAP: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    if (
      state.fullLinkBonus == "행동력 0.1" ||
      state.fullLinkBonus == "행동력 0.15" ||
      state.fullLinkBonus == "행동력 0.2"
    ) {
      return (data.ap + rootGetters["equip/getAP"] + data.fullLinkAP).toFixed(
        3
      );
    } else {
      return (data.ap + rootGetters["equip/getAP"]).toFixed(3);
    }
  },
  // 추후 장비 값 추가
  getCharacterRange: (state, getters, rootState, rootGetters) => {
    const data = state.characterSelect[0];
    if (state.fullLinkBonus == "사거리 +1") {
      return "+" + data.fullLinkRange;
    } else {
      return 0;
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
  // 캐릭터 고유의 풀링크 보너스 배열로 불러오기
  // 해당 풀링 보너스가 0일경우(없을경우) null로 반환
  getFullLinkRes: state => {
    if (state.characterSelect[0].fullLinkRes == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.RES + state.characterSelect[0].fullLinkRes;
    }
  },
  getFullLinkAP: state => {
    if (state.characterSelect[0].fullLinkAP == 0) {
      return null;
    } else {
      return CONST.FULL_LINK_BONUS.AP + state.characterSelect[0].fullLinkAP;
    }
  },
  getFullLinkSKill: state => {
    if (state.characterSelect[0].fullLinkSkill == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.SKILL +
        state.characterSelect[0].fullLinkSkill * 100 +
        "%"
      );
    }
  },
  getFullLinkHit: state => {
    if (state.characterSelect[0].fullLinkHit == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.HIT + state.characterSelect[0].fullLinkHit + "%"
      );
    }
  },
  getFullLinkCrit: state => {
    if (state.characterSelect[0].fullLinkCrit == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.CRIT + state.characterSelect[0].fullLinkCrit + "%"
      );
    }
  },
  getFullLinkDodge: state => {
    if (state.characterSelect[0].fullLinkDodge == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.DODGE +
        state.characterSelect[0].fullLinkDodge +
        "%"
      );
    }
  },
  getFullLinkHealth: state => {
    if (state.characterSelect[0].fullLinkHealth == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.HEALTH + state.characterSelect[0].fullLinkHealth
      );
    }
  },
  getFullLinkBuff: state => {
    if (state.characterSelect[0].fullLinkBuff == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.BUFF +
        state.characterSelect[0].fullLinkBuff +
        "레벨"
      );
    }
  },
  getFullLinkRange: state => {
    if (state.characterSelect[0].fullLinkRange == 0) {
      return null;
    } else {
      return (
        CONST.FULL_LINK_BONUS.RANGE + state.characterSelect[0].fullLinkRange
      );
    }
  },
  getFullLinkBonusFilters: (state, getters) => {
    const list = [
      getters.getFullLinkRes,
      getters.getFullLinkAP,
      getters.getFullLinkSKill,
      getters.getFullLinkHit,
      getters.getFullLinkCrit,
      getters.getFullLinkDodge,
      getters.getFullLinkHealth,
      getters.getFullLinkBuff,
      getters.getFullLinkRange
    ];
    // 보너스 없으면 null값 반환하고 null 값 필터링
    return list.filter(element => element !== null);
  },
  // 스킬 계수 계산 액티브 1스킬
  getSkill01Damage: (state, getters) => {
    const data = state.characterSelect[0];
    // 스킬 보너스 있을 경우 곱셈
    if (
      state.fullLinkBonus == "스킬피해 15%" ||
      state.fullLinkBonus == "스킬피해 20%" ||
      state.fullLinkBonus == "스킬피해 25%" ||
      state.fullLinkBonus == "스킬피해 30%"
    ) {
      return (
        getters.getCharacterDamage *
        (data.skill01Coef * (1 + data.fullLinkSkill))
      );
      // 스킬 계수 없을경우 (버프스킬 등)
    } else if (data.skill01Coef == 0) {
      return 0;
    } else {
      return getters.getCharacterDamage * data.skill01Coef;
    }
  },
  // 스킬 계수 계산 액티브 2스킬
  getSkill02Damage: (state, getters) => {
    const data = state.characterSelect[0];
    // 스킬 보너스 있을 경우 곱셈
    if (
      state.fullLinkBonus == "스킬피해 15%" ||
      state.fullLinkBonus == "스킬피해 20%" ||
      state.fullLinkBonus == "스킬피해 25%" ||
      state.fullLinkBonus == "스킬피해 30%"
    ) {
      return Math.round(
        getters.getCharacterDamage *
          (data.skill02Coef * (1 + data.fullLinkSkill))
      );
      // 스킬계수 없을경우 (버프스킬 등)
    } else if (data.skill02Coef == 0) {
      return 0;
    } else {
      return Math.round(getters.getCharacterDamage * data.skill02Coef);
    }
  },
  getSkill01FinalDamage: (state, getters, rootState, rootGetters) => {
    return Math.round(
      getters.getSkill01Damage *
        (1 +
          rootGetters["equip/getOsDamage"] +
          rootGetters["equip/getGearDamage"])
    );
  },
};

export const mutations = {
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
  }
};
