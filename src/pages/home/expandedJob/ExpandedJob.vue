<template>
    <div class="expanded-page-container">
        <div class="initial-body"
             v-if="currentState=== 'initial'">
            <div class="top-portion">
                <div>
                    <p class="close-button"
                       @click="closeModal">X</p>
                </div>
                <brief-description-container class="top-container"
                                             v-bind:Company="jobInfo.jobInfoById.company.name"
                                             v-bind:url="jobInfo.jobInfoById.company.url"
                                             v-bind:iD="CompanyID"
                                             v-bind:location="jobInfo.jobInfoById.location.city"
                                             v-bind:status="jobInfo.jobInfoById.jobType.name"
                                             v-bind:issue="jobInfo.jobInfoById.company.humanityProblems[0].shortName"
                                             v-bind:Position="jobInfo.jobInfoById.title"
                                             @closeModal="closeModal"
                                             @pass="pass"
                                             @apply="apply"
                                             @save="save" />
            </div>
            <div class="bottom-portion"
                 v-html="jobInfo.jobInfoById.description">
            </div>
        </div>
        <div class="passed-body"
             v-if="currentState=== 'passed'">
            <p class="apology">our bad!</p>
            <img id="bullseye"
                 src="@/assets/graphics/bullseye.svg" />
            <p class="apology">why did you pass?</p>
            <p id="tip">your feedback helps us find more relevant jobs for you.</p>
            <div class="buttons-container">
                <div class="left-button"
                     @click="exitPass(2)">
                    meh job title
                </div>
                <div class="right-button"
                     @click="exitPass(1)">
                    meh company
                </div>
            </div>
        </div>
        <div class="applied-body"
             v-if="currentState=== 'applied'">
            <p class="applied-text">applied</p>
            <p id="dancer"> 🎉💃🏻🕺🏻🎉</p>
            <div class="buttons-container">
                <div class="left-button"
                     @click="exitApply">
                    keep looking
                </div>
            </div>
        </div>
        <div class="saved-body"
             v-if="currentState=== 'saved'">
            <p class="apology">saved</p>
            <p id="tip">come back to this job in the faves tab. for most jobs, the earlier you apply the better your chances.</p>
            <div class="buttons-container">
                <div class="left-button"
                     @click="exitSave">
                    keep looking
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Prop, Component } from 'vue-property-decorator'
  import { getModule } from 'vuex-module-decorators'
  import suggestedJobs from '@/store/modules/suggestedJobs.ts'
  import suggestedJobsApi from '@/services/api/suggestedJobsApi'
  import ExpandedJobContainer from '@/components/ExpandedJobContainer.vue'
  @Component({
    components: {
      'brief-description-container': ExpandedJobContainer
    }
  })
  export default class ExpandedJob extends Vue {
    jobInfo = getModule(suggestedJobs)
    @Prop() CompanyID: number
    CompanyInfo = {}
    currentState = 'initial'

    created() {
      this.jobInfo.recieveJobInfoById(this.CompanyID)
    }

    exit() {
      this.closeModal()
      this.jobInfo.jobArray.pop()
    }

    exitApply() {
      this.closeModal()
      this.jobInfo.jobArray.pop()
      suggestedJobsApi.applyJob(this.CompanyID)
    }
    exitSave() {
      this.closeModal()
      this.jobInfo.jobArray.pop()
      suggestedJobsApi.saveJob(this.CompanyID)
    }
    exitPass(reason: number) {
      this.closeModal()
      this.jobInfo.jobArray.pop()
      suggestedJobsApi.passJob(this.CompanyID)
      setTimeout(() => {
        suggestedJobsApi.submitFeedback(this.CompanyID, reason)
      }, 400)
    }

    pass() {
      this.currentState = 'passed'
    }
    save() {
      this.currentState = 'saved'
    }
    apply() {
      this.currentState = 'applied'
    }
    closeModal() {
      this.$emit('closeModal')
      this.currentState = 'initial'
    }
  }
</script>

<style lang="scss" scoped>
  .top-portion {
    display: flex;
    flex-direction: column;
    background: rgb(202, 240, 255);
    background: linear-gradient(180deg, rgba(202, 240, 255, 1) 85%, rgba(241, 237, 255, 1) 100%);
  }

  .apology {
    font-family: $KronaHeaders;
    font-size: 18px;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
  }

  #tip {
    font-family: $WorkSansDescriptions;
    padding: 15px;
    text-align: center;
  }

  .left-button {
    padding: 15px;
    border: 1px solid #12198f;
    margin-left: 15px;
    margin-right: 15px;
    font-family: $WorkSansDescriptions;
    background: #cbe3ff;
  }
  .right-button {
    padding: 15px;
    border: 1px solid black;
    margin-left: 15px;
    margin-right: 15px;
    background: #cbcbff;
  }
  .passed-body {
    background: #ffe7fe;
    min-width: 1000px;
    min-height: 722px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadein 0.5s;
  }

  .saved-body {
    background: #e7ffe7;
    min-width: 1000px;
    min-height: 722px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadein 0.5s;
  }
  #dancer {
    font-size: 58px;
  }

  .applied-text {
    font-size: 24px;
    font-family: $KronaHeaders;
  }
  .applied-body {
    background: $jobCardPink;
    min-width: 1000px;
    min-height: 722px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadein 0.5s;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .close-button {
    font-size: 30px;
    font-weight: bold;
    color: darkblue;
    float: right;
    position: relative;
    right: 20px;
    top: 10px;
  }

  .expanded-page-container {
    display: flex;
    flex-direction: column;
    max-width: 850px;
    position: absolute;
    margin-bottom: 50px;
  }

  .initial-body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .bottom-portion {
    background: $bottomGrey;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    overflow: scroll;
  }
  @media screen and (max-width: 1180px) {
    .expanded-page-container {
      display: flex;
      flex-direction: column;
      max-width: 800px;
    }
    .passed-body {
      min-width: 800px;
    }
    .saved-body {
      min-width: 800px;
    }
    .applied-body {
      min-width: 800px;
    }
  }
  @media screen and (max-width: 900px) {
    .expanded-page-container {
      display: flex;
      flex-direction: column;
      max-width: 600px;
    }
    .passed-body {
      min-width: 600px;
    }
    .saved-body {
      min-width: 600px;
    }
    .applied-body {
      min-width: 600px;
    }
  }
  @media screen and (max-width: 650px) {
    .expanded-page-container {
      display: flex;
      flex-direction: column;
      max-width: 400px;
    }
    .passed-body {
      min-width: 400px;
    }
    .saved-body {
      min-width: 400px;
    }
    .applied-body {
      min-width: 400px;
    }
  }
</style>