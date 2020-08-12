// 철충 설정
export const state = () => ({
  enemyDefense: 0,
  enemyReduce: 0,
  enemyFrostResist: 0,
  enemyFireResist: 0,
  enemyElecResist: 0
});

export const mutations = {
  SET_ENEMY_DEFENSE(state, enemyDefense) {
    state.enemyDefense = enemyDefense;
  },
  SET_ENEMY_REDUCE(state, enemyReduce) {
    state.enemyReduce = enemyReduce;
  },
  SET_ENEMY_FROST_RESIST(state, enemyFrostResist) {
    state.enemyFrostResist = enemyFrostResist;
  },
  SET_ENEMY_FIRE_RESIST(state, enemyFireResist) {
    state.enemyFireResist = enemyFireResist;
  },
  SET_ENEMY_ELEC_RESIST(state, enemyElecResist) {
    state.enemyElecResist = enemyElecResist;
  }
};
