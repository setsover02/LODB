const character = require("~/data/character.json");

export const state = () => ({
  name: null,
  level: 0, // 레벨 설정
  // 강화 스탯
  damageEnh: 0, // * ?
  healthEnh: 0, // * 3
  defenseEnh: 0, // * ?
  hitEnh: 0, // * 1.5%
  critEnh: 0, // * 0.4%
  dodgeEnh: 0, // * 0.4%
  // 링크 슬롯
  linkSlot1: '100',
  linkSlot2: '100',
  linkSlot3: '100',
  linkSlot4: '100',
  linkSlot5: '100'
});

export const getters = {
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
  },
  // 링크 퍼센티지 합산, 소수점 표기
  totalLink: state => {
    return (
      parseFloat(state.linkSlot1 / 100) +
      parseFloat(state.linkSlot2 / 100) +
      parseFloat(state.linkSlot3 / 100) +
      parseFloat(state.linkSlot4 / 100) +
      parseFloat(state.linkSlot5 / 100)
    );
  }
};

export const mutations = {
  // 이름 검색필터
  searchName(state, name) {
    state.name = name;
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
  // 링크 퍼센티지 적용
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
  }
};
