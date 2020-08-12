import { CONST } from "~/static/const";
export const state = () => ({
  linkSlotItem: CONST.LINK_SLOT, // 링크 퍼센티지 선택
  linkSlot1: 100,
  linkSlot2: 100,
  linkSlot3: 100,
  linkSlot4: 100,
  linkSlot5: 100,
  fullLinkBonus: ""
});

export const getters = {
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

  getFullLinkBonusFilters: (rootGetters) => {
  //  const list = [
  //    rootGetters["characters/sheet/getFullLinkRes"],
    //  rootGetters["characters/data/getFullLinkAP"],
    //  rootGetters["characters/data/getFullLinkSKill"],
    //  rootGetters["characters/data/getFullLinkHit"],
    //  rootGetters["characters/data/getFullLinkCrit"],
    //  rootGetters["characters/data/getFullLinkDodge"],
    //  rootGetters["characters/data/getFullLinkHealth"],
    //  rootGetters["characters/data/getFullLinkBuff"],
    //  rootGetters["characters/data/getFullLinkRange"]
  //  ];
   // 보너스 없으면 null값 반환하고 null 값 필터링
  //  return list.filter(element => element !== null);
   return rootGetters["sheet/getFullLinkRes"];
  }
};

export const mutations = {
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
