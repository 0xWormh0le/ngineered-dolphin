<!-----  NEED TO MAKE CARDS RELOAD EVERYTIME DATA CHANGES ---->
<template>
  <b-container>
    <div class="faves-container">
      <h1 id="title">🔎 search</h1>
    </div>
    <div class="buttons-container">
      <div class="options">
        <p id="results" @change="applyFilters">
          <!---- WAITING FOR COUNT TO BE INCLUDED IN THE API CALL ---->
          <!-- {{ jobList.results.length }}-->
          X results for "{{ input }}"
        </p>
        <img
          class="filter"
          :class="{'isActive': isClicked === true}"
          src="@/assets/graphics/filter.png"
          @click="OpenCloseFilters"
        />
      </div>
      <div class="bottom-content-portion">
        <div class="filterWindow" v-if="showModal">
          <b-container>
            <div class="buttons-container-filter">
              <div class="options">
                <p id="cancel" @click="OpenCloseFilters">cancel</p>
                <p id="filters">filters</p>
                <p id="reset" @click="resetFilters">reset</p>
              </div>
              <div class="bottom-content-portion">
                <div class="choices">
                  <div class="seniority">
                    <h6>seniority</h6>

                    <div class="seniorityChoices">
                      <b-form-group>
                        <b-col sm="12">
                          <b-form-checkbox-group
                            class="red"
                            v-model="selectedSeniority"
                            :options="seniorityList"
                            value-field="id"
                            text-field="shortName"
                            name="seniority"
                            style="column-count: 2"
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="jobType">
                    <h6>job-type</h6>
                    <div class="jobTypeChoices">
                      <b-form-group>
                        <b-col sm="12">
                          <b-form-checkbox-group
                            v-model="selectedJobType"
                            :options="jobTypeList"
                            value-field="id"
                            text-field="name"
                            name="jobType"
                            style="column-count: 2"
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="problems">
                    <h6>problems</h6>
                    <div class="problemChoices">
                      <b-form-group>
                        <b-col sm="12">
                          <b-form-checkbox-group
                            v-model="selectedProblem"
                            :options="problemsList"
                            value-field="id"
                            text-field="shortName"
                            name="problemsType"
                            style="column-count: 2"
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="locations">
                    <h6>locations</h6>
                    <div class="locationChoices">
                      <b-form-group>
                        <b-col sm="12">
                          <b-form-checkbox-group
                            id="locationBoxes"
                            v-model="selectedLocation"
                            :options="locationsList"
                            value-field="id"
                            text-field="name"
                            name="locationsType"
                            style="column-count: 2; "
                          ></b-form-checkbox-group>
                        </b-col>
                      </b-form-group>
                    </div>
                  </div>
                </div>
              </div>

              <b-button type="submit" @click="applyFilters(),infiniteHandler()">
                <span class="btnText">{{ buttonText }}</span>
              </b-button>
            </div>
          </b-container>
        </div>

        <div class="cards">
          <div class="job-content">
            <b-col v-for="(job, $index) in jobList.results" v-bind:key="$index" v-b-modal.my-modal>
             
                <Search-Card>
                   <a :href="job.company.url">
                  <div class="text">
                    <h5>{{ job.title }}</h5>
                    <br />
                    <p class="info">
                      {{ job.company.name }} |
                      {{ job.company.humanityProblems[0].shortName }}
                    </p>
                  </div>
                   </a>
                </Search-Card>
             
            </b-col>

            <Infinite-Loading @infinite="infiniteHandler" force-use-infinite-wrapper="job-content"></Infinite-Loading>
          </div>
        </div>
      </div>
    </div>

    <!-- I couldnt get the modal to work for EACH single job separately -->
    <!-- <b-modal id="my-modal"><template> <Job-Preview :company="this.job.title" :jobTitle="this.job.title"  /> </template></b-modal> -->
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { seniorityFilters } from "@/interfaces/filters.interface";
import { jobTypeFilters } from "@/interfaces/filters.interface";
import { locationsFilters } from "@/interfaces/filters.interface";
import { problemsFilters } from "@/interfaces/filters.interface";
import { IUser } from "../../interfaces/user.interface";
import { favesJobs } from "../../interfaces/favesInfo.interface";
import { use } from "vue/types/umd";
import axios, { AxiosResponse } from "axios";
import InfiniteLoading from "vue-infinite-loading";
import userPage from "@/store/modules/userPage";
import Auth from "@/store/modules/auth";

import filters from "@/services/api/filtersApi";
import usersApi from "@/services/api/usersApi";
import Login from "./Login.vue";
import SearchCard from "@/components/search-components/SearchCard.vue";
import Filters from "@/components/search-components/Filters.vue";
import suggestedJobs from "@/store/modules/suggestedJobs";
import JobPreview from "@/components/search-components/JobPreview.vue";

@Component({
  components: {
    "Search-Card": SearchCard,
    "Filters": Filters,
    "Infinite-Loading": InfiniteLoading,
    "Job-Preview": JobPreview
  }
})
export default class Search extends Vue {
  jobsState = getModule(suggestedJobs);
  @Prop() input!: string;
  currentTab = "sourcing";
  showModal = false;
  buttonText = "apply";
  isClicked = false;

  tabState = getModule(userPage);
  authState = getModule(Auth);

  jobList: { results: favesJobs[] } = {} as { results: favesJobs[] };

  seniorityList: { results: seniorityFilters[] } = {} as {results: seniorityFilters[];};
  jobTypeList: { results: jobTypeFilters[] } = {} as { results: jobTypeFilters[]; };
  problemsList: { results: problemsFilters[] } = {} as { results: problemsFilters[];};
  locationsList: { results: locationsFilters[] } = {} as { results: locationsFilters[];};


  selectedSeniority = [];
  selectedJobType = [];
  selectedProblem = [];
  selectedLocation = [];
  offset = 4;

  resetFilters() {
    this.selectedSeniority = [];
    this.selectedJobType = [];
    this.selectedProblem = [];
    this.selectedLocation = [];
  }

  async applyFilters() {
    this.jobList = await usersApi.searchJobsWithFilters(
      this.input,
      this.selectedSeniority,
      this.selectedJobType,
      this.selectedProblem,
      this.selectedLocation
    );
    this.offset = 4;
    this.OpenCloseFilters();
  }

  infiniteHandler($state) {
    return axios
      .get(
        "/api/v1/jobs/?fields=id,status,title,company&expand=company&limit=4&experiences=" +
          this.selectedSeniority +
          "&job_types=" +
          this.selectedJobType +
          "&problems=" +
          this.selectedProblem +
          "&locations=" +
          this.selectedLocation +
          "&pq=" +
          this.input,
        {
          params: {
            offset: this.offset
          }
        }
      )
      .then((resp: { data }) => {
        // RESP.DATA.COUNT DOESNT EXIT IN THIS API CALL UNLIKE THE OTHERS WHERE INFINITE LOADING IS USED, SO I CANNOT USE IT AS IF STATEMENT
        if (resp.data.length != 0) {
          this.offset += 4;

          //If there are results
          if (resp.data.results?.length) {
            //Adding new results to the existing results
            this.jobList.results = [
              ...this.jobList.results,
              ...resp.data.results
            ];
            $state.loaded();

            //Else we are complete
          } else {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
  }

  OpenCloseFilters() {
    this.showModal = !this.showModal;
    this.isClicked = !this.isClicked;
  }

  changeTab(tab: String) {
    this.tabState.changeTab(tab);
  }

  async mounted() {
    

    // Instead of calling the normal searchJobs, I am calling this with filters empty to make sure when I call the Infinite loader, it is still the same call with filters empty or not empty if they have been applied
    this.jobList = await usersApi.searchJobsWithFilters(
      this.input,
      this.selectedSeniority,
      this.selectedJobType,
      this.selectedProblem,
      this.selectedLocation
    );

    // Loads the filters options
    this.seniorityList = await filters.getSeniority();
    this.jobTypeList = await filters.getJobTypes();
    this.problemsList = await filters.getProblems();
    this.locationsList = await filters.getLocations();
  }
}
</script>

<style scoped lang="scss">
span {
  margin-right: 10% !important;
}

b-form-group {
  display: inline-block !important;
}
.isActive {
  background: $anotherViolet;
  border-radius: 20px;
}

#wrapper {
  background: $violet-Gradient;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
}

.filterWindow {
  z-index: 9;
  position: relative;
}

.filter {
  max-width: 40px;
  justify-content: right;
}

.faves-container {
  margin: 5% auto auto auto;
  text-align: center;
  z-index: 0;
}
.buttons-container {
  text-align: center;
  border: 1px solid black;
  max-width: 600px;
  margin: 5% auto auto auto;
}

#title {
  font-weight: 800 !important;
}

.buttons-container-filter {
  text-align: center;
  border: 1px solid black;
  width: 85%;
  margin: 5% auto auto auto;
  top: -40px;
  left: 14%;
  position: absolute;

  background-color: $tan;
}

.btn {
  width: 46%;
  border-radius: 25px;
  background-color: $pink;
  color: black;
  height: 45px;
  border: 1px solid black;
  margin-bottom: 5%;
}

.btnText {
  font-size: 21px;
  font-weight: 700;
}

b-container {
  margin-bottom: 15%;
}
.options {
  border-bottom: 1px solid black;
  margin: 3% auto 3%;
}
#results {
  text-align: left;
  display: inline-block;
  font-family: $KronaHeaders !important;
  font-size: 16px;
  margin-right: 5%;
  width: 80%;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

h5 {
  font-weight: 700;
  display: inline-block;
}

.info {
  display: inline-block;
}
.text {
  margin: 2%;
  padding: 1%;
  display: inline-block;
}

#cancel {
  display: inline-block;
  margin-left: 2%;
  font-size: 20px;
}

#search {
  margin-left: 30%;
  font-size: 18px;
  font-family: $KronaHeaders;
  line-height: 19px;
  letter-spacing: 1px;
}

.options {
  border-bottom: 1px solid black;
}

#filters {
  text-align: left;
  display: inline-block;
  font-family: $KronaHeaders !important;
  font-size: 20px;
  margin: auto 25%;
}

#reset {
  display: inline-block;
  font-size: 20px;
}

#cancel {
  display: inline-block;
  font-size: 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

h6 {
  font-weight: 700;
  font-family: $KronaHeaders;

  display: inline-block;
}

.info {
  display: inline-block;
}
.text {
  margin: 2%;

  display: inline-block;
}

#search {
  margin-left: 30%;
  font-size: 18px;
  font-family: $KronaHeaders;
  line-height: 19px;
  letter-spacing: 1px;
}

.options {
  border-bottom: 1px solid black;
}

.choices {
  text-align: left;
  margin: 5%;
}

.seniority {
  margin: 8% auto;
}

.jobType {
  margin: 8% auto;
}
.problems {
  margin: 8% auto;
}

.locations {
  margin: 8% auto;
}

@media screen and (max-width: 576px) {
  .container {
    max-width: 500px !important;
    padding: 0;
  }
  button {
    font-size: 15px;
  }

  #title {
    font-weight: 800 !important;
    font-size: 35px;
  }

  h5 {
    font-size: 14px;
  }

  .info {
    font-size: 13px;
  }

  .buttons-container {
    border: none;
  }

  .results {
    display: none;
  }

  .text {
    margin: 2%;
  }

  @media screen and (max-width: 576px) {
    .buttons-container-filter {
      width: 100%;
      left: 0;
      top: -265px;
    }
    #cancel {
      font-size: 15px;
    }

    #filters {
      font-size: 16px;
      margin: auto 18%;
    }

    #reset {
      font-size: 15px;
    }

    .seniorityChoices {
      font-size: 13px;
    }

    .jobTypeChoices {
      font-size: 13px;
    }

    .problemChoices {
      font-size: 13px;
    }

    .locationChoices {
      font-size: 13px;
    }

    h6 {
      font-size: 14px;
    }
  }
}
</style>

