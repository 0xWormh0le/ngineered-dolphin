
<template>
  <div id="wrapper">
    <b-overlay :show="busy" no-wrap class="bg-black">
      <template v-slot:overlay>
        <PinkCard>
          <div class="options">
            <div class="content">
              <p id="cancel">cancel</p>
              <p id="search">search</p>
            </div>
          </div>
          <div class="login-form-container">
            <div class="login-form">
              <div class="login-header">
                <h3 class="title text-center">{{ headline }}</h3>
              </div>
              <div class="paragraph">
                <p>{{paragraph}}</p>
              </div>
              <form class="input-container">
                <div class="form-group row">
                <b-form-input type="email"
                                              v-model="userEmail"
                                              placeholder="email"></b-form-input>
                </div>
              </form>
              <b-button type="submit"
              @click="changeSearchStatus">
                <span class="btnText">{{ buttonText }}</span>
              </b-button>
            </div>
          </div>
        </PinkCard>
      </template>
    </b-overlay>
  </div>
</template> 




<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import PinkCard from "@/components/ModifiableCard.vue";
import NavBar from "@/components/MainNavBar.vue";
import userPage from "@/store/modules/userPage";
import Login from "./Login.vue";
import { IUser } from "../../interfaces/user.interface";
import usersApi from "@/services/api/usersApi";
import { getModule } from 'vuex-module-decorators';
import Auth from "@/store/modules/auth"
const authState = getModule(Auth)
@Component({
  components: { PinkCard, NavBar }
})
export default class PasswordChanged extends Vue {
  headline = "help your friends find impactful jobs";
  buttonText = "refer ";
  paragraph = "refer two friends to dolphin and unlock the ability to search our database of 100,000+ active high-impact jobs.";
  busy = true;
  placeholder = "email 1"
  userInfo: IUser = {} as IUser;
  userEmail =" "

    tabState = getModule(userPage);
  authState = getModule(Auth);

}
</script>


<style scoped lang="scss">
.bg-black {
  background-color: rgba(0, 0, 0, 0.2) !important;
  
}
.input-container {
  padding: 0% 15%;
}
#cancel {
  text-align: left;
  display: inline-block;
  font-size: 18px;
  margin: 10px 0px 10px 20px;
}
#search {
  display: inline-block;
  font-weight: 800;
  margin: 0px 30% 10px 30%;
}
.text-center {
  padding: 5%;
}
#wrapper {
  background: $orange-Gradient;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.options {
  border-bottom: 1px solid black;
}
.bottom-card-div {
  background-color: red;
}
.card-container {
  background: $navbar-blue;
  margin: 15% auto 0 auto;
  display: grid !important;
}
.form-control {
  border-radius: 25px;
  border: 1px solid black;
  color: black;
  height: 45px;
  font-size: 21px;
}
.form-control::placeholder {
  color: black;
  font-size: 20px;
}
input {
  text-indent: 20px;
}
.form-control:focus {
  border-radius: 25px;
  border: 1px solid black;
  color: black;
}
div.login-form-container {
  margin: 10%;
  text-align: center;
  div.login-form {
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
}
.btn {
  width: 46%;
  border-radius: 25px;
  background-color: transparent;
  color: black;
  height: 45px;
  border: 1px solid black;
}
.btnText {
  font-size: 21px;
  font-weight: 700;
}
h4 {
  font-weight: 800;
}
#cancel {
  display: inline-block;
  margin-left: 2%;
  font-size: 20px;
}
#search {
  margin-left: 30%;
  font-size: 18px;
  font-family: $KronaHeaders;
  line-height: 19px;
  letter-spacing: 1px;
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
}
</style>
