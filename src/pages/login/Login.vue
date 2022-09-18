
<template>
    <b-container fluid="lg">
        <Card>
            <div class="login-form-container">
                <div class="login-form">
                    <div class="login-header">
                        <h1 class="title text-center">{{ loginText }}</h1>
                    </div>
                    <div class="paragraph">
                        <p>another day, another offer letter 💪</p>
                    </div>
                    <form class="input-container"
                          @submit.prevent="submitForm">
                        <div class="form-group row">
                            <b-form-input class="no-border"
                                          v-model="user.email"
                                          placeholder="email"></b-form-input>
                        </div>
                        <div class="form-group row">
                            <b-form-input class="no-border"
                                          v-model="user.password"
                                          type="password"
                                          placeholder="password"></b-form-input>
                        </div>
                        <div class="err-msg"
                             v-if="error">
                            <p class="error-name">{{ error.message }}</p>
                        </div>
                        <div class="err-msg"
                             v-if="resetMessage">
                            <p class="error-name">{{ resetMessage }}</p>
                        </div>
                        <div class="text-center">
                            <b-button class="btn-secondary-yellow"
                                      squared
                                      type="submit">
                                <span class="btnText"
                                      v-if="!loading">{{ buttonText }}</span>
                                <i v-else>Loading...</i>
                            </b-button>
                        </div>
                    </form>
                    <div class="paragraph">
                        <router-link to="/provideEmail">
                            <p id="forgotPass">{{forgotPasswordText}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </Card>
    </b-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  import Card from '@/components/Card.vue'

  @Component({
    components: { Card }
  })
  export default class Login extends Vue {
    $refs: { email: HTMLInputElement }
    user = { email: '', password: '' }
    @Prop() loginText!: string
    @Prop() buttonText!: string
    @Prop() forgotPasswordText!: string
    @Prop() rememberMeText!: string
    @Prop() resetMessage!: string
    @Prop() error!: Object
    @Prop() loading!: Boolean
    @Prop() login!: (body: { email: string; password: string }) => {}

    //Commented because it throws an error
    // mounted() {
    //  this.$refs.email.focus();
    // }
    submitForm() {
      this.login({
        email: this.user.email.trim(),
        password: this.user.password
      })
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

  #forgotPass {
    color: $black;
  }

  .btn-secondary-yellow {
    min-width: 150px;
    max-width: 150px;
  }

  .form-group {
    background-color: $black;

    font-family: $signupDescriptionFont;
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
      font-size: 18px;
    }
    .btn {
      width: 100%;
    }

    .btnText {
      font-size: 13px;
    }
  }
</style>
