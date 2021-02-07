import {CONST} from '~/static/const';

export const state = () => ({
  characterSkill: [],
  charactersSkillCol: [
    // REVIEW: Sorting 기능이 계산식 적용될 경우에도 item 데이터에 맞추어 정렬됨
    {text: 'ID', sortable: true, value: 'id'},
    {text: '슬롯', sortable: false, value: 'slot'},
    {text: '타입', sortable: false, value: 'type'},
    {text: '이름', sortable: false, value: 'name'},
    {text: '아이콘', sortable: false, value: 'icon'},
    {text: '타겟', sortable: false, value: 'target'},
    {text: '버프', sortable: false, value: 'buffs'},
    {text: '설명', sortable: false, value: 'description'},
  ],
});

const axios = require('axios');
const _ = require('lodash');

export const actions = {
  async asyncCharacterSkill({commit}) {
    let sheet = 'characterSkill';
    const url = `${CONST.SHEET.URL}${CONST.SHEET.ID}/values/${sheet}!A1:H1000?${CONST.SHEET.API}`;
    const response = await axios.get(url);
    const rows = response.data.values;
    const properties = rows.shift();
    const articles = [];
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]));
    }
    commit('SET_CHARACTERS_SKILL', articles);
  },
};

export const getters = {
  // 캐릭터 아이디를 대조하여 스킬정보 필터링
  getCharacterSkillFilters: (state, getters, rootState, rootGetters) => {
    const id = element => element.id === rootGetters['data/getCharacterId'];
    return state.characterSkill.filter(id);
  },

  getActive1Rate: (state, getters) => {
    const Obj = getters.getCharacterSkillFilters[0].buffs;
    return Obj
  },

  // 1스킬 최종결과 계산
  getActive1Result: (state, getters, rootState, rootGetters) => {
    const a = rootGetters['character/damage/getDamage'];
    const sc = getters.getActive1Rate;
    return a;
  },
};

export const mutations = {
	SET_CHARACTERS_SKILL(state, payload) {
    state.characterSkill = payload;
  },
};
