<template>
  <div class='container'>
    <div class='complete-profile'>
      you’re more than just a resume. stand out to recruiters with your dolphin profile:
      <br>
      📈 show off what you care about and why in an interview format.
      <br>
      🌟️ publish an answer and our in-house recruiter will help you polish it. 
      <br>
      🌳 link to your dolphin profile in your linkedin summary + we’ll plant a tree in your name. email us to claim.
    </div>

    <div class='life-questions'>
      <h5>life questions</h5>
    </div>
  </div>
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
  .container {
    max-width: 10em;
  }

  .complete-profile {
    border: 1px solid black;
    padding: 1em;
    text-align: left;
  }
</style>
