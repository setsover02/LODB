export const CONST = {
  SHEET: {
    URL: 'https://sheets.googleapis.com/v4/spreadsheets/',
    ID: '1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg',
    API: 'key=AIzaSyC2PieL5U28k0z3V1PLo-daw3Dt6Ju61To',
  },
  // 아이템 및 캐릭터 랭크
  RANK: [
    {
      text: 'SS',
      color: 'orange',
    },
    {
      text: 'S',
      color: 'yellow',
    },
    {
      text: 'A',
      color: 'blue',
    },
    {
      text: 'B',
      color: 'mint',
    },
  ],
  // 강화시 증가 스탯
  ENH: {
    DAMAGE: 1.5,
    HEALTH: 8,
    DEFENSE: 1.25,
    ACC: 1.5,
    CRIT: 0.4,
    EVA: 0.4,
  },
  // 링크별 퍼센티지 + '%', store에서 /100 처리됨
  LINK_SLOT: [100, 80, 75, 60, 50, 45, 40, 30, 25, 20, 10, 0],
  FULL_LINK_BONUS: {
    RES: '출격비용 ',
    SPEED: '행동력 ',
    SKILL: '스킬피해 ',
    ACC: '적중 ',
    CRIT: '치명 ',
    EVA: '회피 ',
    HEALTH: '체력 ',
    BUFF: '버프/디버프 + ',
    RANGE: '사거리 +',
  },
};
