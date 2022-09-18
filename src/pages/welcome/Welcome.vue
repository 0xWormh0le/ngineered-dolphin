<template>
    <div class="welcome-page-container">
        <Unauth-navbar />
        <div class="welcome-body">
            <div class="left-portion-body">
                <p class="welcome-header-text">welcome to dolphin</p>
                <p class="welcome-description-left">we match you with high-impact jobs and internships tackling the world’s biggest problems.</p>
                <div class="welcome-buttons">
                    <router-link class="home-buttons"
                                 to="/signup">
                        <Dolphin-Button label="Sign Up" />
                    </router-link>
                    <router-link class="home-buttons"
                                 to="/loginForm">
                        <Dolphin-Button label="Login" />
                    </router-link>
                </div>
            </div>
            <div class="right-portion-body">
                <div class="contents">
                    <Welcome-Card>
                        <div class="content-container">
                            <p class="card1-header">{{header}}</p>
                            <div>
                                <ul class="list">
                                    <li>{{listItem1}}</li>
                                    <li>{{listItem2}}</li>
                                    <li>{{listItem3}}</li>
                                    <li>{{listItem4}}</li>
                                    <li>{{listItem5}}</li>
                                    <li>{{listItem6}}</li>
                                    <li>{{listItem7}}</li>
                                    <li>{{listItem8}}</li>
                                    <li>{{listItem9}}</li>
                                    <li>{{listItem10}}</li>
                                </ul>
                            </div>
                        </div>
                    </Welcome-Card>
                    <Welcome-Card>
                        <div class="welcome-card-2">
                            <div class="welcome-card-2-header">
                                <p>⭐️ stand out with your dolphin profile</p>
                            </div>
                            <div class="welcome-card-2-description">
                                <p>your dolphin profile emphasizes what you care about and why, helping you stand out to our network of hiring managers looking for applicant mission fit.</p>
                            </div>
                        </div>
                    </Welcome-Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import UnauthNavbar from '@/components/UnauthNavbar.vue'
  import Button from '@/components/Button.vue'
  import Card from '@/components/Card.vue'
  import LoginForm from '@/pages/login/LoginWrapper.vue'
  @Component({
    components: {
      'Unauth-navbar': UnauthNavbar,
      'Dolphin-Button': Button,
      'Welcome-Card': Card
    }
  })
  export default class Welcome extends Vue {
    header = '💼 150,000+ jobs and internships:'
    listItem1 = '⛑ curing deadly diseases'
    listItem2 = '🌎 fighting climate change'
    listItem3 = '📚 improving education'
    listItem4 = '🏥 fixing healthcare'
    listItem5 = '🗽 protecting civil liberties'
    listItem6 = '👽 exploring space'
    listItem7 = '💸 reducing poverty'
    listItem8 = '🚗 reinventing mobility'
    listItem9 = '🍔 improving food'
    listItem10 = '🌐 securing the web'
  }
</script>

<style lang="scss" scoped>
  .welcome-page-container {
    background: $welcomePageGradient;
    height: 100%;
    width: 100%;
    display: inline-table;
    flex-direction: column;
  }

  .content-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .contents {
    position: relative;
    top: 15%;
  }
  .list {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    column-count: 2;
    column-gap: 20px;
    column-fill: auto;
    list-style-type: none;
  }

  .card1-header {
    font-family: 'Krona One';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    width: 404px;
    height: 23px;
    margin-left: 31px;
    margin-top: 37px;
  }

  .home-buttons {
    color: black;
    min-width: 120px;
    max-width: 120px;
    text-align: center;
  }
  .welcome-3-text {
    font-family: $KronaHeaders;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 45px;
    display: table-cell;
    vertical-align: middle;
  }

  .welcome-card-3-line-one {
    border-bottom: 1px solid black;
    padding-left: 25px;
  }

  .welcome-card-3-line-two {
    border-bottom: 1px solid black;
    padding-left: 25px;
  }

  .welcome-card-3-line-three {
    padding-left: 25px;
  }

  .welcome-card-2 {
    padding: 25px;
    padding-bottom: 15px;
  }
  .welcome-card-2-header {
    font-family: $KronaHeaders;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
  }

  .welcome-card-2-description {
    font-family: $welcomeDescriptionFont;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
  }

  .welcome-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .welcome-buttons {
    display: flex;
    flex-direction: row;
  }
  .welcome-description-left {
    font-family: $welcomeDescriptionFont;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 40px;
  }

  .left-portion-body {
    max-width: 547px;
    padding-top: 175px;
    margin-right: 50px;
  }
  .right-portion-body {
    max-width: 536px;
  }

  .welcome-header-text {
    font-family: $welcomeHeaderFont;
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 50px;
  }

  .welcome-card-3 {
    min-width: 525px;
  }

  @media screen and (max-width: 1160px) {
    .welcome-body {
      display: flex;
      flex-direction: column;
      align-self: center;
    }

    .right-portion-body {
      max-width: 400px;
      display: flex;
      flex-direction: column;
      align-self: center;
      padding-top: 30px;
    }
    .left-portion-body {
      padding-top: 30px;
      text-align: center;
    }
    .welcome-header-text {
      font-size: 30px;
      line-height: 38px;
    }
    .welcome-description-left {
      font-size: 20px;
      line-height: 27px;
    }

    .welcome-3-text {
      font-family: $KronaHeaders;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 30px;
      display: table-cell;
      vertical-align: middle;
    }

    .content-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    .list {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      column-count: 2;
      column-gap: 5px;
      column-fill: auto;
      list-style-type: none;
    }

    .welcome-card-2 {
      padding: 15px;
    }

    .card1-header {
      font-family: 'Krona One';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      // width: 404px;
      height: 23px;
      margin-left: 10px;
      margin-top: 10px;
    }

    .welcome-card-2-header {
      font-family: $KronaHeaders;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
    }
    .welcome-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-top: 30px;
      margin-top: 15px;
    }
    .welcome-card-2-description {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
    }

    .welcome-card-3 {
      min-width: none;
    }

    .welcome-page-container {
      height: 100%;
    }
    // .right-portion-body{
    //   display: flex;
    //   flex-direction: row;
    // }
  }
</style>
