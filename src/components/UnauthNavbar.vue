<template>
    <div class="invisible-navbar">
        <div class="logo-div">
            <router-link to="/home">
                <img class="logo"
                     src="@/assets/logo/dolphin-logo-black.svg" />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class UnauthNavbar extends Vue {}
</script>

<style lang="scss" scoped>
  .invisible-navbar {
    display: flex;
    flex-direction: row;
  }
  .logo-div {
    margin-top: 50px;
    margin-left: 75px;
  }

  .logo {
    width: 60px;
    height: 60px;
    color: black;
  }

  @media screen and (max-width: 576px) {
    .logo-div {
      margin: 2% auto auto auto;
    }

    
  }
</style>
