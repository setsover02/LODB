export const state = () => ({
  dummy: 0
});

export const getters = {
  getCharacterHealth: (state, getters, rootState, rootGetters) => {
    if (rootGetters["sheet/getCharacterHealthBase"] == undefined) {
      return "not load";
    } else {
      return rootGetters["sheet/getCharacterHealthBase"];
    }
  }
};