<template>
  <b-container>
    <div class="job-content">
      <b-row>
        <b-col
          sm="6"
          v-for="(job, index) in jobList.results"
          v-bind:key="index"
        >
          <div
            class="button"
            @click="
              jobTitle = job.title;
              company = job.company.name;
              workingOn = job.company.humanityProblems[0].shortName;
              showModal = true;
              url = job.company.url;
              jobID = job.id;
              status = job.isActive;
              text = job.description;
              
            "
          >
            <Job-Card color="#FEFFE4">
              <h6>{{ job.title }}</h6>
              <p class="info">
                {{ job.company.name }}
                <span v-if="job.isActive === false">| Expired</span>
              </p>
            </Job-Card>
          </div>
        </b-col>
      </b-row>
      <Infinite-Loading
        @infinite="infiniteHandler"
        force-use-infinite-wrapper="job-content"
      ></Infinite-Loading>
    </div>

    <div class="modal-container" v-if="showModal === true">
      <Job-Modal
        :JobTitle="jobTitle"
        :CompanyName="company"
        :Problem="workingOn"
        :Text="text"
        :Location="location"
        :link="url"
        :JobID="jobID"
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
import axios, { AxiosResponse } from "axios";
import { favesJobs } from "../../interfaces/favesInfo.interface";
import InfiniteLoading from "vue-infinite-loading";
import usersApi from "../../services/api/usersApi";
import JobModal from "@/components/JobModal.vue";
  import suggestedJobsApi from '@/services/api/suggestedJobsApi.ts'
  import suggestedJobs from '@/store/modules/suggestedJobs.ts'
import Login from "./Login.vue";
import JobCard from "@/components/FavesJobCard.vue";

@Component({
  components: {
    "Job-Card": JobCard,
    "Infinite-Loading": InfiniteLoading,
    "Job-Modal": JobModal
  }
})
export default class Saved extends Vue {
  jobList: { results: favesJobs[] } = {} as { results: favesJobs[] };
  offset = 4;
  showModal = false;


  currentjobID: number = 0;
  jobTitle = "";
  company = "";
  time = "";
  workingOn = "";
  text = "";
  location = "";
  url = "";
  jobID = 0;
  status = "";
  modalCurrentState = "settings";
  whichModal = "saved"

  // This is the function that makes the infinite loading Work, it makes API requests after the first call is made by a mounted function
  // For more information, here is the documentation https://peachscript.github.io/vue-infinite-loading/guide/start-with-hn.html

  infiniteHandler($state) {
    return axios
      .get(`/api/v1/user-jobs/?status=3&expand=company&limit=4`, {
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
    this.jobList = await usersApi.getJobsSaved();
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
  background: $dark-yellow;
  margin-top: 5%;
  margin-bottom: 5%;
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
p {
  font-size: 18px;
  line-height: 23px;
}

  a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
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
  padding-top: 20px;
  align-items: center;
  animation: fadein 0.3s;
  height: 100%;
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
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
