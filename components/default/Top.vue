<template lang="pug">
    //- div
      v-navigation-drawer(v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app)
        v-list
          v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
            v-list-item-action
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title(v-text="item.title")

    v-app-bar(:clipped-left="clipped" fixed app color="t300" elevate-on-scroll)
      //- v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      //- v-btn(icon @click.stop="miniVariant = !miniVariant")
        //- v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
      //- v-btn(icon @click.stop="clipped = !clipped")
        //- v-icon mdi-application
      //- v-btn(icon @click.stop="fixed = !fixed") 
        //- v-icon mdi-minus
        
      v-toolbar-items
        v-btn(text to="/") {{ title }}
      v-spacer
      v-toolbar-items
        v-btn(text v-for="item in items" :key="item.title" :to="item.to") {{ item.title }}
      //- v-btn(icon @click.stop="rightDrawer = !rightDrawer")
      //-   v-icon mdi-menu
      v-spacer
      v-btn(text target="blank" href="https://discord.gg/RR8W9Dp" color="white")
        v-icon(left) mdi-discord
        | Discord
      v-btn.mr-2(text target="blank" href="https://docs.google.com/spreadsheets/d/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/edit?usp=sharing" color="green")
        v-icon(left) mdi-google-spreadsheet
        | Google Sheet  
      //- v-btn(text target="blank" href="https://app.gitbook.com/@setsover02/s/lodb/" color="primary") GitBook 
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "Char",
          to: "/"
        },
        {
          title: "items",
          to: "/items"
        },
        {
          title: "Release",
          to: "/release"
        },
        {
          title: "Test",
          to: "/test"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Sim"
    };
  }
};
</script>
