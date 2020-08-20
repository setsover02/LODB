import {CONST} from '~/static/const';

export const getters = {
  getEva: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.eva);
    const l = Number(rootState.data.characterSelect.linkEva * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkEva);
    const p = rootState.enhance.pointEva * CONST.ENH.EVA;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '회피 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
};