// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  getAcc: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.acc);
    const l = Number(rootState.data.characterSelect.linkAcc * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkAcc);
    const p = rootState.enhance.pointAcc * CONST.ENH.ACC;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '적중 75%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
  },
};
