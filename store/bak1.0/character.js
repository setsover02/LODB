// 캐릭터 데이터 (검색 및 선택 등)
import { CONST } from "~/static/const";
const CHARACTER = require("~/static/character.json");

export const state = () => ({
  characterName: null, // Name Search
  charactersCol: [
    // REVIEW: Sorting 기능이 계산식 적용될 경우에도 item 데이터에 맞추어 정렬됨
    { text: "번호", align: "right", sortable: false, value: "id" },
    { text: "아바타", sortable: false, value: "avatar" },
    { text: "이름", sortable: true, value: "name" },
    { text: "등급", align: "center", sortable: false, value: "rank" },
    { text: "유형", sortable: false, value: "type" },
    { text: "역할", sortable: false, value: "role" },
    { text: "레벨", align: "right", sortable: false, value: "level" },
    { text: "체력", align: "right", sortable: true, value: "health" },
    { text: "공격력", align: "right", sortable: true, value: "damage" },
    { text: "1스킬", align: "right", sortable: true, value: "skill1" },
    { text: "2스킬", align: "right", sortable: true, value: "skill2" },
    { text: "적중", align: "right", sortable: true, value: "hit" },
    { text: "치명", align: "right", sortable: true, value: "crit" },
    { text: "회피", align: "right", sortable: true, value: "dodge" },
    { text: "방어력", align: "right", sortable: true, value: "defense" },
    { text: "행동력", align: "right", sortable: true, value: "ap" },
    { text: "장비", align: "right", sortable: false, value: "equip" },
    { text: "메모", align: "right", sortable: false, value: "memo" },
    { text: "", align: "right", sortable: false, value: "actions" }
  ]
});

export const getters = {
  getCharactersData: () => CHARACTER // Get JSON
};

export const mutations = {
  // 이름 검색필터
  SET_SEARCH_NAME(state, characterName) {
    state.characterName = characterName;
  }
};
