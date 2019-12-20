// 레이아웃 및 기타 관련 스타일
// https://medium.com/locale-ai/architecting-vuex-store-for-large-scale-vue-js-applications-24c36137e251
export const state = () => ({
  lightTheme: false
});

export const getters = {
};

export const mutations = {
  SET_THEME(state, lightTheme) {
    state.lightTheme = lightTheme;
  }
};

// export const actions = {
//   async nuxtServerInit({ commit }) {
//     commit("SET_THEME", this.$cookies.get("lightTheme"));
//   }
// };
