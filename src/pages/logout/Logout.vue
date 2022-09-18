<template>
    <div></div>
</template>

<script lang="ts">
  import store from './../../store/store'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getModule } from 'vuex-module-decorators'
  import Auth from '../../store/modules/auth'

  const authState = getModule(Auth)

  @Component({
    components: {}
  })
  export default class Logout extends Vue {
    mounted() {
      authState.logout().then(() => {
        let redirectUrl = '/welcome'
        window.location.href = redirectUrl
      })
    }
  }
  import { mapActions } from 'vuex'
</script>

<style scoped lang="scss"></style>
