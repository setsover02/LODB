export const state = () => ({
  counter: 1,
  damageEnh: 1,
  healthEnh: 13, // * 3
  defenseEnh: 11, // *
  hitEnh: 0, // * 1.5%
  critEnh: 0, // * 0.4%
  dodgeEnh: 0 // *
});

export const getters = {};

export const mutations = {
  updateDamageEnh(state, damageEnh) {
    state.damageEnh = damageEnh;
  },
  addCounter(state) {
    state.counter++;
  },
  subCounter(state) {
    state.counter--;
  }
};
