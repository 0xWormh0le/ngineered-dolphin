
<!------- TODO: Still need to fix wrapper background color taking ALL screen when resized !---->


<template>
    <div id="wrapper">
        <router-link to="/welcome">
            <img class="logo"
                 src='@/assets/logo/dolphin-logo-black.svg' />
        </router-link>
        <div class="login-container">
            <login :login-text="'welcome back'"
                   :button-text="'log in'"
                   :reset-message="resetMessage"
                   :error="error"
                   :remember-me-text="'Remember me'"
                   :forgot-password-text="'forgot your password?😭'"
                   :login="login"
                   :loading="loading"></login>
        </div>
    </div>
</template>

<script lang="ts">
  import Card from '@/components/Card.vue'
  import Cookies from 'js-cookie'
  import store from '../../store/store'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { getModule } from 'vuex-module-decorators'
  import Auth from '../../store/modules/auth'
  import jwt from 'jsonwebtoken'
  import Login from './Login.vue'
  import UnauthNavbar from '@/components/UnauthNavbar.vue'

  const AuthState = getModule(Auth)

  @Component({
    components: { Login, Card, UnauthNavbar }
  })
  export default class LoginWrapper extends Vue {
    error: null | Error = null
    loading = false
    AuthState = AuthState
    $t: (str: string) => ''

    get resetMessage() {
      return this.$route.query['reset-password'] !== undefined && !this.error ? 'Reset password' : null
    }

    mounted() {
      const error = this.$route.query.error as string
      if (error) {
        this.error = {
          name: 'Error',
          message: error === 'login-failure' ? 'Incorrect email' : ''
        }
      }
    }

    async login({ email, password }: { email: string; password: string }) {
      this.loading = true
      this.AuthState.authenticate({ email, password })
        .then(token => {
          if (token) {
            window.location.href = (this.$route.query.redirect as string) || '/'
          }
        })
        .catch((e: Error) => {
          // eslint-disable-next-line no-console
          this.error = { message: 'Something went wrong. Please try again' } as Error
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
  #wrapper {
    background: $pink-Gradient;
    height: 100%;
    overflow: scroll;
  }

  .login-container {
    margin-bottom: 50px;
  }

  .logo {
    position: absolute;
    left: 30px;
    top: 30px;
  }
</style>
