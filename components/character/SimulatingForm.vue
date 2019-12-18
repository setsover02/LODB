<template lang="pug">
//- Character Info
//- Card : 데이터 없을경우
v-card.fill-height.d-flex.flex-column.align-center.justify-center(v-if="getCharacterId === 'undefined'" tile width="470" color="transparent" elevation="0") 
  v-avatar(size="144")
    v-icon(color="t200" size="144") mdi-account-group-outline
    //- v-img(:src="require('~/assets/img/avatar/undefined.png')")
  span.t100--text.headline.font-weight-bold Select Character first
//- Card : DataTable > row 선택 시 선택된 캐릭터 정보 불러옴
v-card.fill-height__vh-n16.overflow-x-hidden.overflow-y-auto(v-else tile width="470" color="transparent" elevation="0")
  v-form(ref="form")
    FormPreview
    
    //- Level, Enhance
    FormEnhance
    v-divider.mt-4
    
    //- Link, FullLink
    FormLink
    v-divider.mt-4
    
    //- Item Equip
    FormEquipment

</template>
<script>
import { mapGetters } from 'vuex'
import RankChip from '~/components/RankChip'
import FormPreview from '~/components/character/form/FormPreview'
import FormEnhance from '~/components/character/form/FormEnhance'
import FormLink from '~/components/character/form/FormLink'
import FormEquipment from '~/components/character/form/FormEquipment'
export default {
  components: {
    RankChip,
    FormPreview,
    FormEnhance,
    FormLink,
    FormEquipment
  },
  computed: {
    ...mapGetters('enhance', ['getCharacterId']),
  }
}
</script>