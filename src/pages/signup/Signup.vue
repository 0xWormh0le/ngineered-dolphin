<template>
    <div class="mobile-signup-container">
        <Navbar class="navbar" />
        <div class="body">
            <div class="left-portion">
                <p class="header">let's begin with 6 quick questions.</p>
                <div class="description">
                    <p class="description-content">these questions take 2 minutes total and allow us to better understand what jobs/internships you’re looking for.
                    </p>
                    <p class="description-content">once you’re done, we’ll search the web for work that fits your criteria and recommend the best ones.
                    </p>
                </div>
                <div class="button-container">
                    <router-link to="/questions">
                        <Begin-button label="let's gooo ⛵️" />
                    </router-link>
                </div>
            </div>
            <div class="right-portion">
                <div class="card-container">
                    <Card>
                        <div class="inner-right-content-wrapper">
                            <p class="card-top-header">{{header}}</p>
                            <p class="description">{{descriptionOne}}</p>
                            <p class="description">{{descriptionTwo}}</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Button from '@/components/Button.vue'
  import UnauthNavbar from '@/components/UnauthNavbar.vue'
  import Card from '@/components/Card.vue'
  @Component({
    components: {
      'Begin-button': Button,
      Navbar: UnauthNavbar,
      Card: Card
    }
  })
  export default class Signup extends Vue {
    header = '💟 job applicants love us'
    descriptionOne =
      '“I recently started looking for a job as a software engineer and was overwhelmed with the number of companies and choices. There are so many lists out there (Breakout List, Wealthfront Career Launching Companies, HackerNews Who’s Hiring) that tell you what’s out there, but nothing that starts with what you want.'
    descriptionTwo =
      'Dolphin is completely different. I tell Dolphin exactly what I’m looking for, and the app matches jobs to my preferences. It’s literally the easiest thing ever. It’s helped me find jobs that I never even knew existed, but match what I want exactly.”  - reginald l.'
  }
</script>

<style lang="scss" scoped>
  .mobile-signup-container {
    width: 100%;
    height: 100%;
    background: $mobileSignupPageGradient;
    display: flex;
    flex-direction: column;
  }

  .button-container {
    display: flex;
	margin-top: 20px;
	color: black;
  }
  .right-portion {
    visibility: visible;
    // height: 100%;
    max-width: 536px;
    max-height: 600px;
    align-self: center;
  }
  .body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 50px;
    padding-right: 50px;
  }

  .description {
    font-family: $signupDescriptionFont;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
  }

  .card-top-header {
    font-family: $KronaHeaders;
    font-size: 20px;
  }
  .header {
    font-family: $KronaHeaders;
    color: $mobileSignupPagePurple;
    font-size: 30px;
    line-height: 31px;
    padding-top: 10px;
  }

  .left-portion {
    max-width: 523px;
    margin-right: 90px;
    align-self: center;
  }

  .navbar {
    visibility: visible;
  }

  .card-content {
    visibility: visible;
  }

  .inner-right-content-wrapper {
    padding: 30px;
  }

  .header {
    color: black;
  }
  @media screen and (max-width: 851px) {
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 50px;
      padding-right: 50px;
    }

    .right-portion {
      padding-top: 30px;
    }
    .header {
      font-size: 22px;
      line-height: 21px;
      padding-top: 20px;
    }

    .description {
      font-size: 14px;
      line-height: 17px;
    }

    .card-top-header {
      font-family: $KronaHeaders;
      font-size: 16px;
    }

    .inner-right-content-wrapper {
      padding: 15px;
    }
  }

  @media screen and (max-width: 622px) {
    .left-portion {
      margin-right: 0;
    }

    .right-portion {
      padding-top: 10px;
    }

    .body {
      padding-top: 45px;
    }

    .navbar {
      display: none;
    }
  }

  // }
</style>
