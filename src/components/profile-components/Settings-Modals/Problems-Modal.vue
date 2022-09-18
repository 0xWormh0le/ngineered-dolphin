<template >
  <div
    class="expanded-page-container"
    :class="{ closeModal: currentState === 'settings' }"
    v-if="currentState === 'initial'"
    @closeModal="closeModal"
  >
    <p class="close-button" @click="closeModal">X</p>
    <div class="initial-body">
      <div class="top-portion">
      

        <div class="wrapper">
          <div id="title">
            <h4>{{ titles.text }}</h4>
          </div>
          <div id="question">{{ titles.description }}</div>
        </div>

      </div> 

        <div id="selections">

          <div class="bottom-portion" v-if="this.state === 'problems'">

            <p class="error" v-if="error"> {{errorMessages[2]}}</p>

         
        
           
            <div
              class="choices-selection"
              v-for="choice in choices"
              :v-model="activeButtons"
              :class="{ purple: _.includes(activeButtons, choice.id) }"
              :key="choice.id"
              :value-field="choice.id"
              @click="addChoices(choice.id)"
            >
              {{ choice.icon }} {{ choice.name }} 
            </div>
           
            

            <b-button type="submit" @click="applyChanges(activeButtons)">
              <span class="btnText">{{ buttonText }}</span>
            </b-button>
          </div>

          <div class="bottom-portion" v-else-if="this.state === 'locations'">

             <p class="error" v-if="error"> {{errorMessages[2]}}</p>
            <div
              class="choices-selection"
              :v-model="activeButtons"
              :class="{ purple: isFlexibleChosen === true  }"
             
              @click="flexibleChosen()"

            >
              flexible within the united states
            </div>

            <div
              class="choices-selection"
              v-for="choice in choices"
              :v-model="activeButtons"

              
              :class="{
                purple: _.includes(activeButtons, choice.id) ||isFlexibleChosen === true

              }"
              :key="choice.id"
              @click="addChoices(choice.id)"
            >
             {{ choice.displayName }}
            </div>

            <div
              class="choices-selection"
              :v-model="activeButtons"
              :class="{ purple: _.includes(activeButtons, 25) }"

              :value-field="1"

              @click="addChoices(25)"
            >
              remote positions
            </div>
            <b-button type="submit" @click="applyChanges(activeButtons)">
              <span class="btnText">{{ buttonText }}</span>
            </b-button>
          </div>

          <div class="bottom-portion" v-else-if="this.state === 'roles'">
              <p class="error" v-if="error"> {{errorMessages[2]}}</p>

            <div
              class="choices-selection"
              v-for="choice in choices"
              :v-model="activeButtons"
              :class="{
                purple: _.includes(activeButtons, choice.id)
              }"
              :key="choice.id"
              @click="addChoices(choice.id)"
            >
              {{ choice.name }}
            </div>
            <b-button type="submit" @click="applyChanges(activeButtons)">
              <span class="btnText">{{ buttonText }}</span>
            </b-button>
          </div>

          <div class="bottom-portion" v-else-if="this.state === 'types'">

              <p class="error" v-if="error"> {{errorMessages[2]}}</p>

            <div
              class="choices-selection"
              v-for="choice in choices"
              :v-model="activeButtons"
              :class="{
                purple: _.includes(activeButtons, choice.id)
              }"
              :key="choice.id"
              @click="addChoices(choice.id)"
            >
              {{ choice.name }}
            </div>
            <b-button type="submit" @click="applyChanges(activeButtons)">
              <span class="btnText">{{ buttonText }}</span>
            </b-button>
          </div>
          <div class="bottom-portion" v-else-if="this.state === 'experience'">

              <p class="error" v-if="error"> {{errorMessages[2]}}</p>

            <div
              class="choices-selection"
              v-for="choice in choices"
              :v-model="activeButtons"
              :class="{
                purple: _.includes(activeButtons, choice.id)
              }"
              :key="choice.id"

              @click="activeButtons.splice(0, activeButtons[0]), addChoices(choice.id);"

            >
              {{ choice.name }}
            </div>
            <b-button type="submit" @click="applyChanges(activeButtons)">
              <span class="btnText">{{ buttonText }}</span>
            </b-button>
          </div>

          <div class="bottom-portion" v-else-if="this.state === 'education'">
            <div class="form">
              <form class="input-container">
                <div class="form-group row">
                  <b-form-input
                    class="no-border"
                    :placeholder="userSchool"
                    :v-model="userSchool"
                  ></b-form-input>
                </div>
                <div class="form-group row">
                  <b-form-input
                    class="no-border"
                    :placeholder="userTitle"
                  ></b-form-input>
                </div>

                <div class="form-group row">
                  <b-form-input
                    class="no-border"
                    :placeholder="userDegree"
                  ></b-form-input>
                  <b-form-input
                    class="no-border"
                    :placeholder="userGradYear"
                  ></b-form-input>
                </div>
                <b-form-radio-group
                  class="pt-2"
                  :options="['dropped out/ didn\'t enroll']"
                ></b-form-radio-group>

                <div class="text-center">
                  <b-button type="submit" @click="updateSchoolDeets(questionData[0].answer.id, questionData[2].answer.id,questionData[1].answer.id,questionData[3].answer.id)">
                    <span class="btnText">{{ buttonText }}</span>
                  </b-button>
                </div>
              </form>
            </div>
          </div>

          <div  class="bottom-portion" id="bottom-email" v-else-if="this.state === 'email'">
             <div class="form">
            <div class="email-form">
              <form class="input-container">
                <div class="form-group row">
                  <b-form-input
                    type="email"
                    class="no-border"

                    

                    :placeholder="email"
                    v-model="userEmail"
                  ></b-form-input>
                </div>
              </form>

              <b-button id="email-button" type="submit" @click="updateEmail(userEmail)">
                <span class="btnText">{{ buttonText }}</span>
              </b-button>
            </div>
             </div>
          </div>

            <div  class="bottom-portion" id="bottom-password" v-else-if="this.state === 'password'">
             <div class="form">
            <div class="email-form">
              <form class="input-container">
                <div class="form-group row">
                  <b-form-input
                    type="password"
                    class="no-border"
                   
                    placeholder="new password"
                    v-model="newPassword"
                  ></b-form-input>
                </div>
                <div class="form-group row">
                  <b-form-input
                    type="password"
                    class="no-border"
                   
                    placeholder="confirm new password"
                    v-model="confirmationPassword"
                  ></b-form-input>
                </div>
              </form>

              <p id="error" v-if="error"> {{errorDisplay}}</p>

              <b-button id="email-button" type="submit" @click="updatePassword()" >
                <span class="btnText">{{ buttonText }}</span>
              </b-button>
            </div>
             </div>
          </div> 


        </div>
      </div>
    </div>

</template>


<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import suggestedJobs from "@/store/modules/suggestedJobs.ts";
import suggestedJobsApi from "@/services/api/suggestedJobsApi";
import ExpandedJobContainer from "@/components/ExpandedJobContainer.vue";
import QuestionsApi from "@/services/api/questionsApi";
import usersApi from "@/services/api/usersApi";
import authApi from "@/services/api/authApi";
import AutocompleteInput from '@/components/autocomplete-input/AutocompleteInput.vue';
import _ from "lodash";
@Component({
  components: {
    "brief-description-container": ExpandedJobContainer
  }
})
export default class Problems_Modal extends Vue {
  jobInfo = getModule(suggestedJobs);
  @(Prop()!) Information;
  @(Prop()!) state;
  @Prop() email?;
  @(Prop()!) previouslyChosenOptions;
  @Prop() answerIDQuestion?;
  @Prop() userDegree;
  @Prop() userSchool;
  @Prop() userTitle;
  @Prop() userGradYear;

  titles = {};
  currentState = "initial";
  choices = {};
  activeButtons: number[] = [];
  buttonText = "update";
  userEmail: string;
  sessionId = localStorage.getItem("singup-session-id");
  questionData:Object;
  newPassword = "";
  confirmationPassword= "";
  error = false;

  errorMessages: Array<string> = ["Passwords do not match, try again","Password too small. It must contain atleast 8 characters", "Choose atleast one option"]
  errorDisplay = ""
  isFlexibleChosen  = false;

  async created() {
    if (this.state === "problems") {

      this.titles = this.Information[8];
      this.choices = await QuestionsApi.getHumanityProblems();
      this.activeButtons = [];
      this.activeButtons = this.previouslyChosenOptions;
    } else if (this.state === "locations") {
      this.titles = this.Information[7];
      this.choices = await QuestionsApi.getJobLocations();
      this.activeButtons = [];


      if (this.previouslyChosenOptions.length=== 0){

        this.isFlexibleChosen = true;
        this.activeButtons = [1,2,3,4,5,536,541];
      }else{ this.activeButtons = this.previouslyChosenOptions;}



    } else if (this.state === "roles") {
      this.titles = this.Information[6];
      this.choices = await QuestionsApi.getJobRoles();
      this.activeButtons = this.previouslyChosenOptions;
    } else if (this.state === "types") {
      this.titles = this.Information[4];
      this.choices = await QuestionsApi.getJobTypes();
      this.activeButtons = this.previouslyChosenOptions;
    } else if (this.state === "experience") {
      this.titles = this.Information[5];
      this.choices = await QuestionsApi.getExperiences();
      this.activeButtons = this.previouslyChosenOptions;
    } else if (this.state === "education") {
      this.titles = {
        text: "first, some school deets.",
        description:
          " list your most recent degree below. this helps us find jobs you’re qualified for. "
      };
      this.questionData = await QuestionsApi.getQuestions(this.sessionId);
    } else if (this.state === "email") {
      this.titles = {
        text: "change your email",
        description: " unless you like what you see "
      };

      this.choices = await QuestionsApi.getExperiences();
    }

    else if (this.state === "password") {
      this.titles = {
        text: "change your password",
        description: " enter your new password below. and make sure it’s not ‘1234’ "
      };

    }

     //this.activeButtons = [];
  }



  closeModal() {
    this.$emit("closeModal");
    this.currentState = "initial";
    this.activeButtons = [];
  }


  applyChanges(chosenAnswers) {


    if (this.isFlexibleChosen){

       usersApi.changeAnswers(this.answerIDQuestion,[])
      this.$emit('applyChanges')
    } else{  
    
    if (chosenAnswers.length === 0){
      this.error = true;
    }else{
      this.error = false;
    usersApi.changeAnswers(
      this.answerIDQuestion,
      chosenAnswers);
      
      
        this.activeButtons = [];
      this.$forceUpdate();
    this.closeModal();
      }
    
  }


  }

  updateEmail(input: string) {
    usersApi.changeEmail(input);
    this.closeModal();
  }

  async updateSchoolDeets(schoolID, titleID,DegreeID,gradYearID){
   const changeSchool = usersApi.changeAnswers(
      schoolID,
      this.userSchool,
     
    );

     const changeTitle = usersApi.changeAnswers(
      titleID,
      this.userTitle,
     
    );

     const changeDegree = usersApi.changeAnswers(
      DegreeID,
      this.userDegree,
      
    );

     const changeGradyear = usersApi.changeAnswers(
      gradYearID,
      this.userGradYear,
    );


  }

  updatePassword(){
    if (this.newPassword !== this.confirmationPassword){
 
      
      this.errorDisplay = this.errorMessages[0];
      this.error = true;
    } else if (this.newPassword.length< 8) {
      this.error = true;

      this.errorDisplay = this.errorMessages[1];
      }
      
      else{

      
      authApi.changePassword(this.newPassword,this.confirmationPassword)
      this.error = false;
      this.closeModal()



    }

  }

  addChoices(id) {

   
    this.isFlexibleChosen = false;
     // If array has the id of the value, go into the function passed to _remove which returns everything but that element as the new array

    if (_.includes(this.activeButtons, id)) {
      this.activeButtons = _.remove(this.activeButtons, function(element) {
        return element != id;
      });
    } else {
      this.activeButtons.push(id);
    }

   
  }


  //TODO: Function to change colors of buttons when flexible within the us is chosen.

  flexibleChosen(){
   
   this.isFlexibleChosen = !this.isFlexibleChosen;
   this.activeButtons = [];

  }
  


  


}
</script>

<style lang="scss" scoped>
#email-button{

  width: 100%;
    margin: auto;
}

// #bottom-email{
//        margin-left: 200px;
//     margin-right: 200px;
//     margin-bottom: 30px;
//     margin-top: 5px;
// }


.error{


  color: red;
}
.top-portion{

     
    margin: auto;
}

.bottom-portion{

  width: 95%;
    margin: auto;
}
p{
  margin-bottom:0px ;
}
.btn {
  width: 46%;
  border-radius: 25px;
  background-color: $pink;
  color: black;
  height: 45px;
  border: 1px solid black;
     margin-left: 15%;
    margin-right: 15%;
    margin-top: 5%;
}
.purple {
  background: #d3ccff;
}

.flexible-purple {
  background: #d3ccff;
}


.form {
  width: 70%;
  margin: 5% auto;
}
.wrapper {
  margin: 2%;
}
.choices-selection {
  border: 1px solid black !important;
  margin: 10px 10px;
  padding: 20px;
  
  display: inline-block;
}

.email-form {
  margin: auto;
  padding: 5%;
  width: 100%;
  display: inline-block;
}
.expanded-page-container {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  position: absolute;
  top: 15%;
  background: #feffe3;
  padding: 20px;
}

.closeModal {
  display: none;
}
.modal-container {
  background: none;
}

.question-selector {
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;

  &.selected {
    background-color: #deebff;
  }

  .question-image {
    height: 24px;
  }
}

.expanded-page-container {
  border: 4px solid black;
}

#question {
  width: 70%;
  margin: auto;
}

.close-button {
  font-size: 30px;
  font-weight: bold;

  text-align: right;
}


</style>

