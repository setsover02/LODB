// 캐릭터 시뮬레이션 최종 계산식
import {CONST} from '~/static/const';

export const getters = {
  // getStat 이름을 가진 getter는 강화, 링크, 풀링보너스, 칩, 보조장비 까지만 합산한다
  getSpeed: (state, getters, rootState, rootGetters) => {
    const b = Number(rootState.data.characterSelect.speed);
    const l = Number(rootState.data.characterSelect.linkSpeed * rootGetters['link/getTotalLink']);
    const f = Number(rootState.data.characterSelect.fullLinkSpeed);
    const eq = 0;
    const F = b + l + eq;
    if (b == undefined || b == null) {
      return 'Not Load';
    } else if (rootState.link.fullLinkBonus == '행동력 0.10' || rootState.link.fullLinkBonus == '행동력 0.15' || rootState.link.fullLinkBonus == '행동력 0.20') {
      return (F + f).toFixed(3);
    } else {
      return F.toFixed(3);
    }
  },
}