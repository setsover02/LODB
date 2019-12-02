export const state = () => ({
  counter: 1,
  level: 0,
  damageEnh: 0, // * ?
  healthEnh: 0, // * 3
  defenseEnh: 0, // * ?
  hitEnh: 0, // * 1.5%
  critEnh: 0, // * 0.4%
  dodgeEnh: 0 // * 0.4%
});

export const getters = {
  // skadms
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
  addCounter(state) {
    state.counter++;
  },
  subCounter(state) {
    state.counter--;
  }
};
