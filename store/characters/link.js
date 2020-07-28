import { CONST } from "~/static/const";
export const state = () => ({
  linkSlotItem: CONST.LINK_SLOT, // 링크 퍼센티지 선택
  linkSlot1: 100,
  linkSlot2: 100,
  linkSlot3: 100,
  linkSlot4: 100,
  linkSlot5: 100,
  fullLinkBonus: "",
  linkSlot: [
    {
      input: 100
    },
    {
      input: 100
    },
    {
      input: 100
    },
    {
      input: 100
    },
    {
      input: 100
    }
  ]
});

export const mutations = {
  SET_LINK_SLOT(state, payload) {
    state.linkSlot[(payload, index)].input = payload.val;
  }
};
