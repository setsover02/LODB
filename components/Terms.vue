<template lang="pug">
    v-col(cols="4")
      v-card.radial-t200
        v-card-text
          v-btn(href="https://app.gitbook.com/@setsover02/s/lodb/" target="blank" color="primary") GitBook
</template>
<script>
export default {
  data: () => ({
    stat: [
      {
        name: 'ID',
        desc: '도감번호'
      },
      {
        name: 'Name',
        desc: ''
      },
      {
        name: 'Grade',
        desc: '승급 염두'
      },
      {
        name: 'Type',
        desc: '유형'
      },
      {
        name: 'Role',
        desc: '역할'
      },
      {
        name: 'damageBase',
        desc: '1렙 공'
      },
      {
        name: 'damageCoef',
        desc: '레벨업시 증가 공'
      },
      {
        name: 'damage',
        desc:
          'damageBase + (damageCoef * (level - 1)) 인데 여기에 기타 증가치 추가 할지 말지'
      },
      {
        name: 'damageItem',
        desc: '아이템 증가수치 damage + damageItem'
      },
      {
        name: 'damageLink',
        desc:
          '1링크 시 증가 수치, 여기에 링크 보너스 곱 + damage + damageItem = damageFin'
      }
    ]
  })
}
</script>
