export const CONST = {
  // 아이템 및 캐릭터 랭크
  RANK: {
    SS: {
      text: "SS",
      color: "orange"
    },
    S: {
      text: "S",
      color: "yellow"
    },
    A: {
      text: "A",
      color: "blue"
    },
    B: {
      text: "B",
      color: "mint"
    }
  },
  // 강화시 증가 스탯
  ENH: {
    DAMAGE: 1.5,
    HEALTH: 8,
    DEFENSE: 1.25,
    HIT: 1.5,
    CRIT: 0.4,
    DODGE: 0.4
  },
  // 링크별 퍼센티지 + '%', store에서 /100 처리됨
  LINK_SLOT: [100, 80, 75, 25, 10, 0]
};
