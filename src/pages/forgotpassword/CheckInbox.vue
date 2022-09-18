<template>
    <div id="wrapper">
        <Unauth-Navbar />
        <b-container fluid="lg">
            <Card>
                <div class="login-form-container">
                    <div class="login-form">
                        <div class="login-header">
                            <h1 class="title text-center">{{ headline }}</h1>
                        </div>
                        <div class="paragraph">
                            <p>{{paragraph}}</p>
                        </div>

                        <router-link to="/loginForm">
                            <b-button class="btn-secondary-green "
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
    components: { 
      "Card": Card, 
      "Unauth-Navbar":UnauthNavbar }
  })
  export default class CheckInbox extends Vue {
    headline = 'check your inbox'
    buttonText = 'back to log in'
    paragraph ='we just sent the password reset link to your email. if you didn’t receive it, contact us at george@splashwithdolpin.com. '
  }
</script>

<style scoped lang="scss">
  #wrapper {
    background: $pink-Gradient;
    display: flex;
    flex-direction: column;
    height: 100%;
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
  }

  @media screen and (max-width: 576px) {
    .card-container {
      max-width: 300px;
    }

    h1 {
      font-size: 22px !important;
    }

    div.login-form-container div.login-form {
      font-size: 16px;
    }
    .btn {
      width: 70%;
    }
    .btnText {
      font-size: 13px;
    }
  }
</style>
