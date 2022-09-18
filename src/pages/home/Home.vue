<template>
    <div class="modal-black-wrapper">
        <div class="home-container">
            <navbar />
            <div class="body">
                <div class="main-body-content-container">
                    <div class="top-portion-container">
                        <p class="greeting">👋 {{authState.name}},</p>
                        <p class="greeting-description">We analyzed thousands of jobs and found the ones most relevant to you today.</p>
                    </div>
                    <div class="middle-portion-container"
                         v-if="jobCardInfo.waiting == true">
                        <SyncLoader color="#12198F" />
                    </div>
                    <div v-if="jobCardInfo.waiting == false"
                         class="middle-portion-container">
                        <div name="transition-group"
                             v-if="jobCardInfo.jobArray.length">
                            <!-- loop through job suggestions. Taken directly from "suggested jobs" module, using getModule -->
                            <Job-Card class="card"
                                      v-for="(result, index) in jobCardInfo.jobArray"
                                      :key="index"
                                      :class="{
										'card--top': index === (jobCardInfo.jobArray.length)-1,
										'next-card': index === ((jobCardInfo.jobArray.length)-1)-1,
							}">
                                <Main-Card v-bind:company="result.company.name"
                                           v-bind:title="result.title"
                                           v-bind:url="result.company.url"
                                           v-bind:currentNum="currentCardCount"
                                           v-bind:totalNum="jobCardInfo.suggestedJobCount"
                                           v-bind:issue="result.company.humanityProblems[0].shortName"
                                           v-bind:numOfIssues="result.company.humanityProblems"
                                           @pass="passedButton(result.id, reason)"
                                           @save="savedButton(result.id)"
                                           @apply="appliedButton(result.id)"
                                           @toggleModal="sendID(result.id)"
                                           v-on:recieve-reason="updateParent"
                                           :description="
											result.description" />
                            </Job-Card>
                        </div>
                        <no-more-jobs v-if="!jobCardInfo.jobArray.length" />
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-container"
             v-if="showModal=== true">
            <home-modal @closeModal="closeModal"
                        v-bind:CompanyID="currentjobID" />
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Prop } from 'vue-property-decorator'
  import { Component } from 'vue-property-decorator'
  import NavBar from '@/components/MainNavBar.vue'
  import JobCard from '@/components/JobCard.vue'
  import MainCard from '@/components/JobCardContent/MainCard.vue'
  import CardCounter from '@/components/CardCounter.vue'
  import { getModule } from 'vuex-module-decorators'
  import Auth from '@/store/modules/auth'
  import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
  import suggestedJobsApi from '@/services/api/suggestedJobsApi'
  import suggestedJobs from '@/store/modules/suggestedJobs'
  import CardCounter1 from '@/components/CardCounter1.vue'
  // import SavedCard from '@/components/JobCardContent/SavedCard.vue'
  // import PassCard from '@/components/JobCardContent/PassCard.vue'
  import NoMoreJobs from '@/components/NoMoreJobs.vue'
  import ExpandedJob from '@/pages/home/expandedJob/ExpandedJob.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  @Component({
    components: {
      navbar: NavBar,
      'Job-Card': JobCard,
      'Main-Card': MainCard,
      'Vue-Swipe': Vue2InteractDraggable,
      'Card-Counter': CardCounter,
      // 'Saved-Card':SavedCard,
      // 'Pass-Card':PassCard,
      'no-more-jobs': NoMoreJobs,
      'home-modal': ExpandedJob,
      'card-counter1': CardCounter1,
      SyncLoader
    }
  })
  export default class Home extends Vue {
    authState = getModule(Auth)
    jobCardInfo = getModule(suggestedJobs)
    isShowing: boolean = true
    showModal: boolean = false
    currentjobID: number = 0
    currentCardCount: number = 1
    jobArrayLength = 0
    reason: number = 0

    created() {
      this.jobCardInfo.recieveJobData()
      //   this.countNumOfIssues()
    }
    updateParent(reason) {
      this.reason = reason
    }
    calcNumOfIssues = issues => {
      let newResults = issues.pop()
      return newResults
    }
    // countNumOfIssues = () => {
    //   alert(JSON.stringify(this.jobCardInfo.jobResults.results[0]))
    // }

    hideCard() {
      setTimeout(() => {
        this.isShowing = false
        this.jobCardInfo.jobArray.pop()
      }, 200)
    }

    sendID(id) {
      this.currentjobID = id
      this.showModal = true
    }

    closeModal() {
      this.showModal = false
    }

    passedButton(id) {
      this.hideCard()
      if (this.currentCardCount != this.jobCardInfo.suggestedJobCount) {
        this.currentCardCount++
      }
      suggestedJobsApi.passJob(id)
      setTimeout(() => {
        suggestedJobsApi.submitFeedback(id, this.reason)
      }, 400)
    }

    savedButton(id) {
      this.hideCard()
      if (this.currentCardCount != this.jobCardInfo.suggestedJobCount) {
        this.currentCardCount++
      }
      suggestedJobsApi.saveJob(id)
    }
    appliedButton(id) {
      this.hideCard()
      if (this.currentCardCount != this.jobCardInfo.suggestedJobCount) {
        this.currentCardCount++
      }
      suggestedJobsApi.applyJob(id)
    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100%;
    flex-direction: column;
    background: linear-gradient(180deg, #aeb9ff 0%, #b4e9ff 100%);
  }
  .shapes {
    position: relative;
    top: 35px;
    width: 100%;
  }
  .swipe-wrapper {
    display: contents;
  }
  .body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: auto;
  }
  .issue-star {
    position: relative;
    float: left;
  }
  .modal-black-wrapper {
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    opacity: 1;
    z-index: 1;
  }
  .card-counter1 {
    // position: fixed;
    // top: 250px;
    // left: 62%;
    // transform: rotate(-20deg);
    float: left;
    margin-left: 35px;
    // border: none;
    position: absolute;
    left: 150%;
    top: -10px;
    visibility: hidden;
  }

  .current--issue {
    visibility: visible;
    top: -8px;
    left: 0;
    position: absolute;
  }

  .card-counter2 {
    // position: fixed;
    // top: 250px;
    // left: 62%;
    transform: rotate(20deg);
    float: right;
    margin-right: 100px;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    padding-top: 50px;
    align-items: center;
    animation: fadein 0.3s;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeinnextcard {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slidemiddle {
    //start from outside of page
    from {
      margin-left: 500%;
    }

    to {
      margin-left: 0%;
    }
  }

  div a {
    text-decoration: none;
  }

  .card {
    background: darkblue;
    border: none;
    position: fixed;
    left: 90%;
    visibility: hidden;
    pointer-events: none;
    border-radius: 0;
  }

  .card--top {
    position: static;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    animation: slidemiddle 0.5s;
  }

  .next-card {
    opacity: 0.4;
    visibility: visible;
    position: fixed;
    pointer-events: none;
    animation: fadeinnextcard 0.9s;
  }

  .body-info-container {
    border: 1px solid black;
    max-width: 395px;
    margin-bottom: 15px;
  }

  .main-body-content-container {
    min-width: 750px;
    margin-top: 35px;
    border: 1px solid black;
  }
  .right-body-content-container {
    max-width: 700px;
    margin-top: 35px;
    position: fixed;
    right: -210px;
    margin-left: 30px;
    overflow: hidden;
    opacity: 0.5;
  }

  .greeting {
    font-family: $KronaHeaders;
    font-size: 24px;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .greeting-description {
    line-height: 20px;
    font-family: $WorkSansDescriptions;
    font-size: 18px;
    max-width: 450px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .top-portion-container {
    line-height: 35px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .bottom-portion-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .bottom-info-container {
    border: 1px solid black;
    max-width: 530px;
    margin-bottom: 15px;
  }

  .middle-portion-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 480px;
  }

  .next-card-container {
    display: flex;
    justify-content: center;
    margin-top: 142px;
  }

  @media screen and (max-width: 1180px) {
    .main-body-content-container {
      min-width: 650px;
    }
    .bottom-info-container {
      max-width: 430px;
    }

    .modal-container {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.7);
      padding-top: 50px;
      align-items: center;
      animation: fadein 0.3s;
      height: 100%;
      width: 100%;
      //   max-width: 400px;
      //   max-height: 400px;
    }
  }
  @media screen and (max-width: 900px) {
    .main-body-content-container {
      border: none;
      max-width: 450px;
      min-width: auto;
      margin-top: 5px;
    }
    .card-counter1 {
      // position: fixed;
      // top: 250px;
      // left: 62%;
      // transform: rotate(-20deg);
      float: left;
      margin-left: -75px;
      // border: none;
      position: absolute;
      left: 150%;
      top: -10px;
      visibility: hidden;
    }

    .current--issue {
      visibility: visible;
      top: -45px;
      left: 0;
      position: absolute;
      transform: rotate(-15deg);
    }

    .card-counter2 {
      display: none;
    }

    .top-portion-container {
      border-bottom: none;
    }

    .middle-portion-container {
      padding-top: 0px;
    }
  }
  @media screen and (max-width: 645px) {
    .next-card {
      display: none;
    }
    .card-counter1 {
      // position: fixed;
      // top: 250px;
      // left: 62%;
      // transform: rotate(-20deg);
      float: left;
      margin-left: -75px;
      // border: none;
      position: absolute;
      left: 150%;
      top: -10px;
      visibility: hidden;
    }

    .current--issue {
      visibility: hidden;
    }
  }
</style>