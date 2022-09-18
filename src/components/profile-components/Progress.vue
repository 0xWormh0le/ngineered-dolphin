<template>
  <b-container>
    <div class="job-content">
      <div class="graph">
        <p id="percent">
          👏 this month, you’re more productive than
          <b>{{parseInt(userInfo.progress.productivity.value)}}% of dolphin users.</b>
        </p>
      </div>

      <div class="upcoming-matches">
        <div class="title">
          <h5>{{userInfo.progress.matches}} upcoming job matches 🔮</h5>
        </div>

        <div class="bottom">
          <b-row no-gutters>
            <b-col>
              <div id="application-streak">
                <h3>{{userInfo.progress.streakDays}} day 🔥</h3>application streak
              </div>
            </b-col>
            <b-col>
              <div id="applications">
                <h3>{{userInfo.progress.applied}} 📝</h3>applications
              </div>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col id="saved-jobs">
              <h3>{{userInfo.progress.saved}} 🔖</h3>saved jobs
            </b-col>
            <b-col id="most-applications-day">
              <h3>{{userInfo.progress.appliedPerDayRecord}} 📨</h3>most applications in a day
            </b-col>
          </b-row>
        </div>
      </div>

      <div class="your-profile">
        
          <div class="profile-title">
            <h5>🐬 your profile</h5>
          </div>
          <div class="bar-wrapper">
            <div id="bar">
              <b-progress
                :variant="black"
                style="background-color:white;border:1px solid black; border-radius:20px"
                class="mb-3"
              >
                <b-progress-bar
                  style="background-color:#E7FFE8;border-radius:20px;border-right:1px solid black"
                  :value="userInfo.progress.profileCompletionPercent"
                ></b-progress-bar>
              </b-progress>
            </div>
            <div id="progress-text">{{userInfo.progress.profileCompletionPercent}}%</div>
          </div>
          <div id="text">
            show off what you care about with your dolphin profile. add it to your linkedin and we’ll plant a tree in your name on teamtrees.org.
            <a>Email us to claim</a>
          </div>

        <Job-Card color="#E7FFE8">
          <p>complete profile</p>
        </Job-Card>
      </div>
    </div>
  </b-container>
</template> 


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { favesJobs } from "../../interfaces/favesInfo.interface";
import axios, { AxiosResponse } from "axios";
import usersApi from "../../services/api/usersApi";
import { IUserExpanded } from "../../interfaces/user.interface";
import Login from "./Login.vue";
import JobCard from "@/components/JobCard.vue";
import LineChart from "@/components/profile-components/Chart/LineChart.vue";

@Component({
  components: {
    "Job-Card": JobCard
  }
})
export default class Progress extends Vue {
  userInfo: { results: IUserExpanded[] } = {} as { results: IUserExpanded[] };
  yValues = [];
  xValues = [];

  async created() {
    this.userInfo = await usersApi.getUserProgress();
  }
}
</script>


<style lang="scss" scoped>
#percent {
  width: 50%;
}
.container {
  padding: 0px !important;
}

.graph {
  width: 100%;
  border-bottom: 1px solid $black;
}
.profile-title {
  text-align: left;
  margin: 5% auto;
}
.button-color {
  background: $olive-green !important;
}
.title {
  background: $olive-green;
  padding: 5%;
  border-bottom: 1px solid $black;
}

.upcoming-matches {
  margin: 5% auto;
  width: 70%;
  border: 1px solid $black;
}

#application-streak {
  padding: 40px;

  border-bottom: 0.5px solid $black;
  margin: auto;
}

#applications {
  padding: 40px;
  border-bottom: 0.5px solid $black;
  border-left: 0.5px solid $black;
  margin: auto;
}

#saved-jobs {
  padding: 40px;

  margin: auto;
}
#most-applications-day {
  padding: 40px;
  border-left: 0.5px solid $black;
  margin: auto;
}

.bottom {
  margin: auto;
}

.bottom::after {
  height: 500px;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 1px dotted $black;
}

.your-profile {
  border: 1px solid $black;
  margin: 5% auto;
  width: 70%;
}

.wrapper {
  margin: 2% 5%;
}

#text {
  text-align: left;
}

#bar {
  width: 70%;
  margin: 2% 12% 2% 0%;
  display: inline-block;
}

#progress-text {
  display: inline-block;
}

p {
  display: inline-block;
  margin: 4% auto;
}

.card-container {
  width: 40%;
  background: $dark-purple;
}
</style>
