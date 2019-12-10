<template lang="pug">
  v-app(dark)
    Top
    v-content
      v-container(fluid)
        nuxt
    //- <v-navigation-drawer
    //-   v-model="rightDrawer"
    //-   :right="right"
    //-   temporary
    //-   fixed
    //- >
    //-   <v-list>
    //-     <v-list-item @click.native="right = !right">
    //-       <v-list-item-action>
    //-         <v-icon light>
    //-           mdi-repeat
    //-         </v-icon>
    //-       </v-list-item-action>
    //-       <v-list-item-title>Switch drawer (click me)</v-list-item-title>
    //-     </v-list-item>
    //-   </v-list>
    //- </v-navigation-drawer>
    //- <v-footer
    //-   :fixed="fixed"
    //-   app
    //- >
    //-   <span>&copy; 2019</span>
    //- </v-footer>
</template>

<script>
import Top from '~/components/default/Top.vue'
export default {
  components: {
    Top,
  }
}
</script>
