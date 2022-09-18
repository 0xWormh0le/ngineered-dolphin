<template>
  <div>
    <div v-if="currentState == 'initial'">
      <div class="header-portion">
        <div class="header-container">
          <card-tracker v-bind:currentNum="currentNum" v-bind:totalNum="totalNum" class="tracker" />
          <a :href="url" target="_blank">
            <p class="company-name">{{ company }}</p>
          </a>
          <p class="position-title">{{ title }}</p>
          <div class="issue-container">
            <issue-icon v-for="(result, index) in numOfIssues" :key="index" v-bind:issue="result.shortName" />
          </div>
        </div>
      </div>
      <div class="body-container">
        <div @click="toggleModal" class="body-portion">
          <p v-html="description"></p>
        </div>
        <div @click="toggleModal" class="see-more">
          <p>See more...</p>
        </div>
      </div>
      <div class="footer-portion">
        <div class="pass-button" @click="pass">💩 p(ass)</div>
        <div class="apply-button" @click="apply">🎯 apply</div>
        <div class="save-button" @click="save">⭐️ save</div>
      </div>
    </div>
    <div v-if="currentState == 'passed'">
      <div class="passed-card">
        <div class="pass-card-inner-container">
          <div class="close-button">
            <p @click="close">X</p>
          </div>
          <p class="passed-text">our bad!</p>
          <img class="bullseye" src="@/assets/graphics/bullseye.svg" />
          <p class="passed-text">why did you pass?</p>
          <p class="tip">your feedback helps us find more relevant jobs for you.</p>
        </div>
        <div class="passed-footer-portion">
          <div class="passed-top-button" @click="nextCardPass('pass', 2)">meh job title</div>
          <div class="passed-bottom-button" @click="nextCardPass('pass', 1)">meh company</div>
        </div>
      </div>
    </div>
    <div v-if="currentState == 'applied'">
      <div class="applied-card">
        <div>
          <p class="passed-text">applied!</p>
          <p class="dancers">🎉💃🏻🕺🏻🎉</p>
        </div>
        <div class="passed-footer-portion">
          <div class="applied-top-button" @click="nextCard('apply')">continue searching</div>
        </div>
      </div>
    </div>
    <div v-if="currentState == 'saved'">
      <div class="saved-card">
        <div class="saved-card-container">
          <p class="passed-text">saved!</p>
          <p class="saved-tip">
            come back to this job in the faves tab. for most jobs, the earlier you apply the better your chances.
          </p>
        </div>
        <div class="passed-footer-portion">
          <div class="saved-top-button" @click="nextCard('save')">continue searching</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { InteractEventBus } from 'vue2-interact'
import suggestedJobs from '@/store/modules/suggestedJobs'
import IssueIcon from '@/components/JobCardContent/IssueIcon.vue'
import CardTracker from '@/components/JobCardContent/CardTracker.vue'
@Component({
  components: {
    'issue-icon': IssueIcon,
    'card-tracker': CardTracker
  }
})
export default class MainCard extends Vue {
  @Prop() company: string
  @Prop() title: string
  @Prop() description: string
  @Prop() url: string
  @Prop() issue: string
  @Prop() numOfIssues: any
  @Prop() currentNum: Number
  @Prop() totalNum: Number
  currentState = 'initial'
  jobCardInfo = getModule(suggestedJobs)

  toggleModal() {
    this.$emit('toggleModal')
  }
  nextCard(type) {
    setTimeout(() => {
      this.$emit(type)
    }, 50)
  }

  // created(numOfIssues) {
  //   alert(numOfIssues)
  // }

  nextCardPass(type: string, reason: number) {
    setTimeout(() => {
      this.$emit(type)
      this.$emit('recieve-reason', reason)
    }, 50)
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
  close() {
    this.currentState = 'initial'
  }
}
</script>
<style lang="scss" scoped>
.position-title {
  font-family: $KronaHeaders;
  font-size: 16px;
  line-height: 22px;
}

.tracker {
  position: absolute;
  right: 15px;
  top: 15px;
}

.bullseye {
  margin-top: 5px;
  margin-bottom: 5px;
}
.issue-container {
  display: flex;
  flex-direction: row;
}
.close-button {
  position: absolute;
  right: 5%;
  top: 3%;
  cursor: pointer;
}
.header-container {
  display: flex;
  flex-direction: column;
}

.saved-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.passed-footer-portion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-top: 15px;
}
.left-portion {
  max-width: 75%;
}
.body-container {
  height: 280px;
}

.pass-card-inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}

.passed-top-button {
  border: 1px solid black;
  border-left: none;
  border-right: none;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #e7ffe8;
  cursor: pointer;
}

.applied-top-button {
  border-top: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #cbcbff;
}
.saved-top-button {
  border-top: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #cbe3ff;
}

.saved-tip {
  font-size: 16px;
  width: 75%;
}

.dancers {
  font-size: 40px;
}
.passed-bottom-button {
  border: 1px solid black;
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top: none;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #cbe3ff;
  cursor: pointer;
}

.company-name {
  text-decoration: underline;
  color: darkblue;
}

.tip {
  width: 75%;
  font-size: 16px;
  margin-top: 5px;
}

.passed-card {
  background: $jobCardYellow;
  min-height: 445px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.applied-card {
  background: $jobCardPink;
  min-height: 445px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 50px;
}
.saved-card {
  background: $jobCardGreen;
  min-height: 445px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 40%;
}

.passed-text {
  font-family: $KronaHeaders;
  font-size: 16px;
  margin: 10px;
}

.header-portion {
  border-bottom: 1px solid black;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 30px;
  background: $jobCardPink;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.body-portion {
  padding: 25px;
  max-height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: white;
  line-height: 20px;
}
.see-more {
  display: flex;
  padding-top: 5px;
  flex-direction: column;
  overflow: hidden;
  background: white;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 14px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
}
.see-more {
  display: flex;
  padding-top: 5px;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid black;
  background: white;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 14px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
}
.footer-portion {
  display: table;
  min-width: 100%;
  text-align: center;
  border-top: 1px solid black;
}
.apply-button {
  border: none;
  background: transparent;
  border-right: 1px solid black;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background: $jobCardPink;
  display: table-cell;
  cursor: pointer;
}

.pass-button {
  border: none;
  background: transparent;
  border-right: 1px solid black;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background: $jobCardYellow;
  display: table-cell;
  cursor: pointer;
}

.save-button {
  border: none;
  background: transparent;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background: $jobCardGreen;
  display: table-cell;
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .header-portion {
    min-height: 200px;
  }
}
</style>
