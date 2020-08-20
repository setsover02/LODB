// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getCrit: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.crit);
    const l = Number(rootState.data.characterSelect.linkCrit * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkCrit);
    const p = rootState.enhance.pointCrit * CONST.ENH.CRIT;
    const eq = 0; // TODO: 장비로 증가하는
    const F = b + p + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '치명 20%') {
      return (F + f).toFixed(1) + '%';
    } else {
      return F.toFixed(1) + '%';
    }
	},
}