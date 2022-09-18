<template>
    <div id="wrapper">
        <router-link to="/welcome">
            <img class="logo"
                 src='@/assets/logo/dolphin-logo-black.svg' />
        </router-link>
        <b-container class="b-container"
                     fluid="lg">
            <Card>
                <div class="login-form-container">
                    <div class="login-form">
                        <div class="login-header">
                            <h1 class="title text-center">{{ headline }}</h1>
                        </div>
                        <div class="paragraph">
                            <p>fill out your email below and we’ll send over a link to reset your password.</p>
                        </div>
                        <form class="input-container">
                            <div class="form-group row">
                                <b-form-input type="email"
                                              v-model="userEmail"
                                              placeholder="email"></b-form-input>
                            </div>
                            <div class="err-msg"
                                 v-if="error">
                                <p class="error-name">{{ error.message }}</p>
                            </div>
                            <div class="text-center">
                                <router-link to="/CheckInbox">
                                    <b-button class="btn-secondary-pink"
                                              squared
                                              type="submit"
                                              @click="resetPassword">
                                        <span class="btnText">{{ buttonText }}</span>
                                    </b-button>
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </b-container>
    </div>
</template> 




<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import AuthApi from '@/services/api/authApi'

  import Card from '@/components/Card.vue'
  import UnauthNavbar from '@/components/UnauthNavbar.vue'
  import Login from './Login.vue'
  import '@/assets/logo/dolphin-logo-black.svg'

  @Component({
    components: {
      Card: Card,
      'Unauth-Navbar': UnauthNavbar
    }
  })
  export default class ProvideEmail extends Vue {
    headline = "don't worry"
    buttonText = 'reset'
    userEmail = ''
    error = ' '

    resetPassword() {
      this.userEmail = this.userEmail.trim()
      AuthApi.reset(this.userEmail)
    }
  }
</script>

<style scoped lang="scss">
  .text-center {
    padding: 5%;
  }
  .form-control {
    border: 1px solid $black !important;
    border-radius: 0px !important;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
  }

  .logo {
    position: absolute;
    left: 30px;
    top: 30px;
  }

  #wrapper {
    background: $yellow-Gradient;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }

  .b-container {
    margin-bottom: 50px;
  }

  .form-group {
    background-color: $black;
    font-family: $signupDescriptionFont;
  }

  .card-container {
    background: $light-pink;
    margin: 15% auto 0 auto;
    max-width: 50%;
    display: grid !important;
  }

  div.login-form-container {
    background-color: white;
    margin: 10%;
    text-align: center;

    div.login-form {
      background-color: #fff;
      width: 100%;
      position: relative;

      margin: 0 auto;
      padding: 0 0 20px 0;
      max-width: 500px;

      font-style: normal;
      font-weight: normal;
      font-size: 21px;
      line-height: 23px;
    }

    div.login-header {
      padding: 50px 0 21px 0;
      font-family: $KronaHeaders;

      h1 {
        font-size: 28px;
        color: black;
        padding: 0;
        margin: 0;
      }
    }

    form.input-container {
      margin: 20px 60px 20px;

      .forgot-password {
        font-size: 14px;
        float: right;
        color: #0000;
      }
      input {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 576px) {
    .card-container {
      max-width: 300px;
    }
    form.input-container {
      width: 50%;
      margin: auto !important;
    }

    h1 {
      font-size: 22px !important;
    }

    div.login-form-container div.login-form {
      font-size: 15px;
    }

    .btn {
      width: 100%;
    }

    .btnText {
      font-size: 13px;
    }
  }
</style>
