<template>
  <b-container>
    <div class="job-content">
      <b-row>
        <b-col sm="6" v-for="(job, index ) in jobList.results" v-bind:key="index">

<div
            class="button"
            @click="
              jobTitle = job.title;
              company = job.company.name;
              workingOn = job.company.humanityProblems[0].shortName;
              showModal = true;
              url = job.company.url;
              companyID = job.id;
              status = job.isActive;
              text = job.description;
            "
          >
          <Job-Card color="#E4FFFD">
          
              <h6>{{job.title}}</h6>
              <p class="info">
                {{job.company.name}}
                <span v-if="job.isActive === false">| Expired</span>
              </p>
           
          </Job-Card>
          </div>
        </b-col>
      </b-row>
      <Infinite-Loading @infinite="infiniteHandler" force-use-infinite-wrapper="job-content"></Infinite-Loading>
    </div>

    <div class="modal-container" v-if="showModal === true">
      <Job-Modal
        :JobTitle="jobTitle"
        :CompanyName="company"
        :Problem="workingOn"
        :Text="text"
        :Location="location"
        :link="url"
        :CompanyID="companyID"
        :Status="status"
        :openingPage = "whichModal"
        @closeModal="closeModal"
      />

    </div>
  </b-container>
</template> 


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { favesJobs } from "../../interfaces/favesInfo.interface";
import InfiniteLoading from "vue-infinite-loading";
import axios, { AxiosResponse } from "axios";
import usersApi from "../../services/api/usersApi";
import JobModal from "@/components/JobModal.vue";
import Login from "./Login.vue";
import JobCard from "@/components/FavesJobCard.vue";

@Component({
  components: {
    "Job-Card": JobCard,
    "Infinite-Loading": InfiniteLoading,
    "Job-Modal": JobModal
  }
})
export default class Emailed extends Vue {
  jobList: { results: favesJobs[] } = {} as { results: favesJobs[] };
  offset = 4;
  showModal = false;



  jobTitle = "";
  company = "";
  time = "";
  workingOn = "";
  text = "";
  location = "";
  url = "";
  companyID = 0;
  status = "";
  modalCurrentState = "saved";
  whichModal = "emailed"

  // This is the function that makes the infinite loading Work, it makes API requests after the first call is made by a mounted function
  // For more information, here is the documentation https://peachscript.github.io/vue-infinite-loading/guide/start-with-hn.html

  infiniteHandler($state) {
    return axios
      .get(`/api/v1/user-jobs/?status=4&expand=company&limit=4`, {
        params: {
          offset: this.offset
        }
      })
      .then((resp: { data }) => {
        if (resp.data.count) {
          this.offset += 4;
          if (resp.data.results?.length) {
            if (this.jobList.results) {
              //Adding new results to the existing results
              this.jobList.results = [
                ...this.jobList.results,
                ...resp.data.results
              ];
            }
          } else {
            $state.complete();
          }

          $state.loaded();
        } else {
          $state.complete();
        }
      });
  }

  async mounted() {
    this.jobList = await usersApi.getJobsEmailed();
  }

   closeModal() {
    this.showModal = false;
    this.modalCurrentState = "settings";
  }
}
</script>


<style lang="scss" scoped>
.text-content {
  max-width: 800px;
  margin: 5%;
  border: 1px solid black;
}

.job-content {
  margin: 5% auto;
  text-align: center;
}

.card-container {
  text-align: left;
  background: $blue;
  margin-top: 5%;
  margin-bottom: 5%;
}

.modal-container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 50px;
  align-items: center;
  animation: fadein 0.3s;
  height: 100%;
  width: 100%;
}

h6 {
  margin-left: 5%;

  margin-top: 4%;
  margin-right: 4%;
}

.info {
  font-size: 16px;
  margin-left: 5%;
}
.col-lg-6 {
  margin-top: 5%;
  margin-bottom: 20px;
}



  a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
}




@media screen and (max-width: 576px) {
  p {
    font-size: 15px;
  }

  h6 {
    font-size: 15px;
  }
}
</style>
