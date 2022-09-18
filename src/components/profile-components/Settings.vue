<template>
  <b-container>
    <div class="problems">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>problems</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  openModal(userSettings[8].answer);

                  modalCurrentState = 'problems';

                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>

        <div class="text">
          <ul style="list-style-type:none;">
            <li
              v-for="(problems, $index) in userSettings[8].answer.values"
              :key="$index"
            >
              {{ problems.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="job-locations">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>job locations</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  openModal(userSettings[7].answer);
                  modalCurrentState = 'locations';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li v-for="(jobLocation, $index) in userSettings[7].answer.values " :key="$index">
              {{ jobLocation.name }}


             
            </li>

          <li v-if=" userSettings[7].answer.values.length === 0" >
            
              flexible within the US
             
            </li>

          </ul>
        </div>
      </div>
    </div>

    <div class="job-roles">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>job roles</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  openModal(userSettings[6].answer);
                  modalCurrentState = 'roles';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li
              v-for="(jobRole, $index) in userSettings[6].answer.values"
              :key="$index"
            >
              {{ jobRole.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="job-types">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>job types</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  openModal(userSettings[4].answer);
                  modalCurrentState = 'types';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li
              v-for="(jobType, $index) in userSettings[4].answer.values"
              :key="$index"
            >
              {{ jobType.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="experience">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>experience</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  openModal(userSettings[5].answer);
                  modalCurrentState = 'experience';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li
              v-for="(experience, $index) in userSettings[5].answer.values"
              :key="$index"
            >
              {{ experience.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="education">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>education</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  showModal =true;
                  modalCurrentState = 'education';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li>
              {{ userSettings[1].answer.values[0].name, }}
              <br />
              {{ userSettings[2].answer.values[0].name }},  {{ userSettings[3].answer.value }}
              <br />
              {{ userSettings[0].answer.values[0].name }}
            </li>
          </ul>

        </div>
      </div>
    </div>

    <div class="email">
      <div class="wrapper">
        <div class="title">
          <b-row>
            <b-col cols="4">
              <h5>email</h5>
            </b-col>
            <b-col cols="8">
              <b-button
                class="button-edit"
                @click="
                  showModal =true;
                  modalCurrentState = 'email';
                "
                >🖊️</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="text">
          <ul style="list-style-type:none;">
            <li>{{ userInfo.email }}</li>
          </ul>
        </div>
      </div>
    </div>

<div class="button" @click="showModal =true
                  modalCurrentState = 'password'">
    <Button class="change-password-button"          
                  label="change password" />
</div>


    <div class="modal-container" v-if="showModal === true">
      <Problems-Modal
        @closeModal="closeModal"
        :previouslyChosenOptions="previouslyChosenOptions"
        :state="modalCurrentState"
        :Information="questionData"
        :email="userInfo.email"
        :answerIDQuestion="answerID"
        :userDegree="degree"
        :userSchool="school"
        :userTitle="title"
        :userGradYear="gradYear"
       
      />
    </div>
  </b-container>
</template> 



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { favesJobs } from "../../interfaces/favesInfo.interface";
import axios, { AxiosResponse } from "axios";
import usersApi from "../../services/api/usersApi";
import { IUserSettings, IUser } from "../../interfaces/user.interface";
import Login from "./Login.vue";
import JobCard from "@/components/JobCard.vue";
import LineChart from "@/components/profile-components/Chart/LineChart.vue";
import Button from "@/components/Button.vue";
import ProblemsModal from "@/components/profile-components/Settings-Modals/Problems-Modal.vue";
import QuestionsApi from "@/services/api/questionsApi";
@Component({
  components: {
    "Job-Card": JobCard,
    Button: Button,
    "Problems-Modal": ProblemsModal
  }
})
export default class Settings extends Vue {
  userSettings: { results: IUserSettings[] } = {} as {
    results: IUserSettings[];
  };

  userInfo: IUser = {} as IUser;
  location: string[] = [];
 

  showModal = false;
  modalCurrentState = "settings";
  sessionId = localStorage.getItem("singup-session-id");
  previouslyChosenOptions: any[] = [];
  questionData:Object;
  answerID: number 
  degree:string
  title:string
  school:string
  gradYear=""

  flexible = false


  async created() {
    // This gives the settings page the current options you have selected, to display them accordingly
    this.userSettings = await usersApi.getUserSettings();

    // This gives the settings page, the email of the account to be displayed
    this.userInfo = await usersApi.getUser();
    //this.chosenLocations();



    
  }
  async mounted() {
    //This gets the title and text shown about a question
    this.questionData = await QuestionsApi.getQuestions(this.sessionId);

    
        this.degree = this.questionData[1].answer.values[0].name;
        this.school = this.questionData[0].answer.values[0].name;
        this.title = this.questionData[2].answer.values[0].name;
        this.gradYear = (this.questionData[3].answer.value).toString();
  
     
  }


updateParent(){
  this.flexible = true;
}

  openModal(chosenOptions? ) {
    // For loop to put all previously chosen options in an array, when the modal opens, it should mark these as already chosen
    this.answerID = chosenOptions.id
    this.previouslyChosenOptions = [];
    if (chosenOptions.values){
        for (let option of chosenOptions.values) {
        
      this.previouslyChosenOptions.push(option.id);
      }
    }
    
    this.showModal = !this.showModal;

  }

  closeModal() {
    this.showModal = false;
    this.modalCurrentState = "settings";
  }
}
</script>


<style lang="scss" scoped>
.problems,
.job-locations,
.job-roles,
.job-types,
.experience,
.job-locations,
.education,
.email {
  border: 1px solid $black;
  margin: 5% auto;
  width: 675px;
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

.title {
  font-size: 20px;
  text-align: left;

  //display: inline-flex;
}

.button-edit {
  margin-left: 30%;
  background-color: transparent;
  border: none;
  float: right;
}
.button{
  display: inline-block;
  width: 50%;
}

.button-edit:focus,
.button-edit:hover {
  border: none;
  background: none;
  box-shadow: none;
  background: none;
  background-color: transparent;
  transition: none !important;
  border-radius: none;
  outline: none;
}

.text {
  text-align: left;
}

.wrapper {
  margin: 2%;
}

.change-password-button {
  width: 100% !important;
  margin: auto;
  margin-bottom: 2%;
}

.text {
  font-family: $WorkSansDescriptions;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  line-height: 25px;
}

.next-to-eachother {
  width: 676px;
}

ul {
  padding: 0;
}

h5 {
  display: inline-block;
}
</style >