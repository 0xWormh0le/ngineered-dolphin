<!-----  NEED TO MAKE CARDS RELOAD EVERYTIME DATA CHANGES ---->
<template>
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
       
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "./Login.vue";
import NavBar from "@/components/MainNavBar.vue";
import { Prop } from "vue-property-decorator";
import usersApi from "@/services/api/usersApi";
import { getModule } from "vuex-module-decorators";
import userPage from "@/store/modules/userPage";
import Auth from "@/store/modules/auth";


import { seniorityFilters } from "@/interfaces/filters.interface";
import { jobTypeFilters } from "@/interfaces/filters.interface";
import { locationsFilters } from "@/interfaces/filters.interface";
import { problemsFilters } from "@/interfaces/filters.interface";

import { use } from "vue/types/umd";
import filters from "@/services/api/filtersApi"
import SearchCard from "@/components/search-components/SearchCard.vue";
import Button from "@/components/Button.vue";

@Component({
  components: {
    NavBar: NavBar,
    SearchCard: SearchCard
  }
})
export default class Filters extends Vue {
  


    seniorityList: { results: seniorityFilters[] } = {} as { results: seniorityFilters[] };
    jobTypeList: { results: jobTypeFilters[] } = {} as { results: jobTypeFilters[] };
    problemsList: { results: problemsFilters[] } = {} as { results: problemsFilters[] };
    locationsList : { results: locationsFilters[] } = {} as { results: locationsFilters[] };

    buttonText="apply";
  


async mounted(){
 this.seniorityList = await filters.getSeniority();
  this.jobTypeList = await filters.getJobTypes();
   this.problemsList = await filters.getProblems();
    this.locationsList = await filters.getLocations(); 

/* eslint-disable */
console.log(this.seniorityList)
console.log(this.jobTypeList)
console.log(this.locationsList)
}


}
</script>

<style scoped lang="scss">
.filter {
  max-width: 40px;
  justify-content: right;
}

.faves-container {
  margin: 5% auto auto auto;
  text-align: center;
  z-index: 2;
}
.buttons-container {
  text-align: center;
  border: 1px solid black;
  width: 100%;
  margin: 5% auto auto auto;
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
#filters {
  text-align: left;
  display: inline-block;
  font-family: $KronaHeaders !important;
  font-size: 20px;
  margin: auto 30%;
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

.seniority{


    margin: 8% auto;
}


.jobType{
    margin: 8% auto;
}
.problems{
    margin: 8% auto;
}
    

.locations{
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

  h6 {
    font-size: 14px;
  }

  .info {
    font-size: 14px;
  }

  .buttons-container {
    border: none;
     top: -148px;
  }


  .results {
    display: none;
  }

  #cancel{

    font-size:15px ;
  }

  #reset{

    font-size:15px ;
  }
  #filters{

    font-size:16px ;
     margin:auto 20%;

  }

.faves-container{

margin:5% auto 2% auto;
}

}
</style>
