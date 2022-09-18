<template>
  <div class="signup-container">
    <h1 class="signup-header">save your answers with an account.</h1>
    <h2 class="signup-description">unless you want to go through the same onboarding flow again...</h2>
    <form class="signup-form">
      <div class="signup-input-group">
        <input
          type="text"
          name="first_name"
          id="first_name"
          class="signup-input"
          placeholder="first name"
          v-model="signupData.firstName"
          required
        />
      </div>
      <div class="signup-input-group">
        <input
          type="text"
          name="last_name"
          id="last_name"
          class="signup-input"
          placeholder="last name"
          v-model="signupData.lastName"
          required
        />
      </div>
      <div class="signup-input-group">
        <input
          type="email"
          name="email"
          id="email"
          class="signup-input"
          placeholder="email"
          v-model="signupData.email"
          required
        />
      </div>
      <div class="signup-input-group">
        <input
          type="password"
          name="password"
          id="password"
          class="signup-input"
          placeholder="password"
          v-model="signupData.password"
          required
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class SignupForm extends Vue {
  @Prop() signupData;
}
</script>

<style lang="scss" scoped>
.signup-container {
  width: 600px;
  padding: 15px;
  box-sizing: border-box;
}

.signup-header {
  font-size: 18px;
  font-family: $KronaHeaders;
  text-align: center;
  padding-top: 15px;
}

.signup-description {
  font-family: 'Work Sans';
  font-size: 20px;
  text-align: center;
  padding: 15px 50px;
}

.signup-input-group {
  width: 350px;
  margin: 0 auto 20px;
}

.signup-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000;

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #000;
  }

  &::-moz-placeholder {
    /* Firefox 19+ */
    color: #000;
    opacity: 1;
  }

  &:-ms-input-placeholder {
    /* IE 10+ */
    color: #000;
  }

  &:-moz-placeholder {
    /* Firefox 18- */
    color: #000;
    opacity: 1;
  }
}
</style>
