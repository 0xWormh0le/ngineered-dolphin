<template>
    <div id="wrapper">
        <UnauthNavbar />
        <b-container>
            <Card>
                <div class="login-form-container">
                    <div class="login-form">
                        <div class="login-header">
                            <h1 class="title text-center">{{ headline }}</h1>
                        </div>
                        <div class="paragraph">
                            <p>{{paragraph}}</p>
                        </div>
                        <form class="input-container">
                            <div class="form-group row">
                                <b-form-input class="no-border"
                                              type="password"
                                              placeholder="new password"></b-form-input>
                            </div>
                            <div class="form-group row">
                                <b-form-input class="no-border"
                                              type="password"
                                              placeholder="retype your new password"></b-form-input>
                            </div>
                        </form>
                        <router-link to="/PasswordChanged">
                            <b-button class="btn-secondary-green"
                                      squared
                                      type="submit">
                                <span class="btnText">{{ buttonText }}</span>

                            </b-button>
                        </router-link>
                    </div>
                </div>
            </Card>
        </b-container>
    </div>
</template> 




<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import Card from '@/components/Card.vue'
  import UnauthNavbar from '@/components/UnauthNavbar.vue'
  import Login from './Login.vue'

  @Component({
    components: { Card, UnauthNavbar }
  })
  export default class PasswordRecovery extends Vue {
    headline = 'password recovery'
    buttonText = 'change password'
    paragraph = '  enter your new password below. and make sure it’s not ‘1234’'
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

  #wrapper {
    background: $blue-Gradient;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .form-group {
    background-color: $black;
    
    font-family: $signupDescriptionFont;
    border-radius: 20px;
  }

  .card-container {
    background: $violet;
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

    div.err-msg {
      margin: 0 66px;

      p {
        font-size: 11px;
        color: red;
        margin: 5%;
        text-transform: uppercase;

        &.error-message {
          text-transform: capitalize;
        }
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
      font-size: 16px;
    }

    .form-control {
      height: 30px;
    }

    .btn {
      width: 100%;
    }

    .btnText {
      font-size: 13px;
    }
  }
</style>
