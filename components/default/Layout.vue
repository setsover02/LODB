<template lang="pug">
div
  v-app-bar(clipped-left app absolute elevate-on-scroll)
    v-app-bar-nav-icon.ml-n2.mr-2(aria-label="Navigation list open." @click.stop="drawer = !drawer")
    //- v-btn(icon @click.stop="miniVariant = !miniVariant")
    //-   v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
    //- v-btn.mr-2(icon @click="backward")
    //-   v-icon mdi-arrow-left
    v-toolbar-items
      v-btn(text to="/") {{ title }}
    v-spacer
    v-btn(text target="blank" href="https://discord.gg/RR8W9Dp" color="white")
      v-icon(left) mdi-discord
      | Discord
    v-btn.mr-2(text target="blank" href="https://docs.google.com/spreadsheets/d/1sDINaswIduO1OWDB0tAtwHa6v53j3Ye_ZVe6uLkhkhg/edit?usp=sharing" color="green")
      v-icon(left) mdi-google-spreadsheet
      | Google Sheet  
    //- v-btn(text target="blank" href="https://app.gitbook.com/@setsover02/s/lodb/" color="primary") GitBook

  v-navigation-drawer(v-model="drawer" color="transparent" width="160" :mini-variant="miniVariant"  clipped absolute app flat)
    v-list.py-12.mt-4.py-lg-0.mt-lg-0
      v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
        v-list-item-content
          v-list-item-title.overline(v-text="item.title")
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          title: "Simulate",
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
      title: "LODB"
    };
  }
};
</script>
