import {CONST} from '~/static/const';

export const getters = {
  getDefense: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.defenseBase);
    const c = Number(rootState.data.characterSelect.defenseCoef);
    const l = Number(1 + rootState.data.characterSelect.linkDefense * rootGetters['link/getTotalLink']);
    const p = rootState.enhance.pointDefense * CONST.ENH.DEFENSE;
    const eq = 0; // TODO: 장비로 증가하는 체력
    const F = (b + (rootState.enhance.level - 1) * c + p + eq) * l;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else {
      return Math.round(F);
    }
  },
};