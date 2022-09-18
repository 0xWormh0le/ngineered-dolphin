<!--- TODO:

Change the buttons
Do Trending tab skelton !---->


<template>
    <div id="app"
         :key="'appKey'">
        <router-view />
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import moment from 'moment'

  @Component({
    components: {}
  })
  export default class App extends Vue {
    created() {}

    destroyed() {}
  }
</script>
<style src="./../src/assets/scss/main.scss" lang="scss"></style>

<style lang="scss">
  html,
  body {
    height: 100%;
  }
  #app {
    height: 100%;
    font-family: $welcomeDescriptionFont;
  }
  #app:not(.safari) {
    .right-side {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  #app {
    margin: 0 auto;
  }

  //Commented because it ruins the height when the screen is resized
  //@media screen and (max-width: 64em) {
  //html {
  //height: auto !important;
  //}
  //}
</style>
