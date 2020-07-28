<template lang="pug">
//- Character Info
v-sheet.fill-height(width="480" color="transparent")
  FormSelect
  v-divider
  //- Card : 데이터 없을경우
  v-card.fill-height.d-flex.flex-column.align-center.justify-center(v-if="getCharacterId === 'undefined'" tile color="transparent" elevation="0") 
    //- v-avatar(size="144")
    //-   v-icon(color="t200" size="144") mdi-account-group-outline
      //- v-img(:src="require('~/assets/img/avatar/undefined.png')")
    span.t100--text.text-h4.font-weight-bold Select Character first
  //- Card : DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
  v-card.fill-height__vh-n16.overflow-x-hidden.overflow-y-auto(v-else tile color="transparent" elevation="0")
    v-form(ref="form")
      //- Level, Rank
      FormAdvance
      v-divider

      //- Point
      FormEnhance
      v-divider

      //- Link
      FormLink
      //- v-divider.mt-4
      //- //- Item Equip
      //- FormEquipment
</template>
<script>
import { mapGetters } from 'vuex'
import FormSelect from '~/components/simulator/character/FormSelect'
import FormAdvance from '~/components/simulator/character/FormAdvance'
import FormEnhance from '~/components/simulator/character/FormEnhance'
import FormLink from '~/components/simulator/character/FormLink'

export default {
  components: {
    FormSelect,
    FormAdvance,
    FormEnhance, FormLink
  },
  computed: {
    ...mapGetters('characters/data', ['getCharacterId']),
  }
}
</script>