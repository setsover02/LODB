export const state = () => ({
  // character: [],
  level: 0, // 레벨 설정
  // 강화 스탯
  damageEnh: 0, // * ?
  healthEnh: 0, // * 3
  defenseEnh: 0, // * ?
  hitEnh: 0, // * 1.5%
  critEnh: 0, // * 0.4%
  dodgeEnh: 0, // * 0.4%
  // 링크 슬롯
  linkSlot1: 1,
  linkSlot2: 1,
  linkSlot3: 1,
  linkSlot4: 1,
  linkSlot5: 1
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
  // 링크 퍼센티지 합산
  totalLink: state => {
    return (
      parseInt(state.linkSlot1) +
      parseInt(state.linkSlot2) +
      parseInt(state.linkSlot3) +
      parseInt(state.linkSlot4) +
      parseInt(state.linkSlot5)
    );
  }
};

export const mutations = {
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
