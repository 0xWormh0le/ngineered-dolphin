<template >
  <div
    class="expanded-page-container"
    @closeModal="closeModal"
    v-if="currentState === 'initial'"
  >
    <p class="close-button" @click="closeModal">X</p>

    <div class="brief-desc-container">
      <a :href="link" class="name-link" target="_blank">{{ CompanyName }}</a>
      <p id="position">{{ JobTitle }}</p>
      <p>{{ stringStatus }}</p>
      <p>Working on: {{ Problem }}</p>
      <div class="buttons-wrapper">

        <div v-if="openingPage === 'saved' && Status === true">
          <div id="pass" @click="pass(JobID)">💩 p(ass)    </div>
          <div id="apply" @click="apply(JobID)">🎯 email job</div>
          
        </div>
        <div v-else-if="openingPage === 'emailed' && Status === true">
          <div id="apply" @click="apply(JobID)">🎯 resend job link</div>
        </div>

        <div v-else>
          <div id="expired" @click="pass(JobID)">🗑️ expired</div>
        </div>
      </div>
    </div>

    <div class="bottom-portion" v-html="Text"></div>
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
import AutocompleteInput from "@/components/autocomplete-input/AutocompleteInput.vue";
import _ from "lodash";

@Component({
  components: {
    "brief-description-container": ExpandedJobContainer
  }
})
export default class Job_Modal extends Vue {
  jobInfo = getModule(suggestedJobs);
  @(Prop()!) JobTitle;
  @(Prop()!) CompanyName;
  @(Prop()!) Problem;
  @(Prop()!) JobTime;
  @(Prop()!) Text;
  @(Prop()!) link;
  @(Prop()!) Location;
  @(Prop()!) JobID;
  @(Prop()!) Status;
  @(Prop()!) openingPage;

  sessionId = localStorage.getItem("singup-session-id");
  place = "";
  stringStatus = "Not Active";

  currentState = "initial";

  async created() {
    if (this.Status === true) {
      this.stringStatus = "Active";
    }
    

  }

  closeModal() {
    this.$emit("closeModal");
    this.currentState = "initial";
  }


  pass(id) {
      suggestedJobsApi.passJob(id)
      this.$emit('pass')
    }
    apply(id) {
      suggestedJobsApi.applyJob(id)
      this.$emit('apply')
    }
    save(id) {
      suggestedJobsApi.saveJob(id)
      this.$emit('save')
    }
}
</script>

<style lang="scss" scoped>
#pass {
  border: 1px solid black;
  border-right: none;
  padding: 25px;
  padding-left: 50px;
  padding-right: 50px;
  background: $jobCardYellow;
  width: 33%;
  display: inline;
}
#save {
  border: 1px solid black;
  padding: 25px;
  padding-left: 50px;
  padding-right: 30px;
  background: $jobCardGreen;
  width: 33%;
  display: inline;
    border-left: none;
}
#apply {
  border: 1px solid black;

  padding: 25px;
  padding-left: 40px;
  padding-right: 40px;
  background: $jobCardPink;
  width: 33%;
  display: inline;
}

#expired{

border: 1px solid black;
 
  padding: 25px;
  padding-left: 50px;
  padding-right: 50px;
  background: #E7FFE7;
  width: 33%;
  display: inline;

}

#position {
  font-family: $KronaHeaders;
  font-size: 18px;
}

.buttons-wrapper {
  position: relative;
  top: 15px;
}
.brief-desc-container {
  border: 1px solid black;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-self: center;
  min-width: 900px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 15px;
}
#email-button {
  width: 100%;
  margin: auto;
}

.bottom-portion {
  background: $bottomGrey;
  text-align: left;
  justify-content: left;
  padding: 30px;
 
  margin-top: 30px;
 
}
.wrapper {
  margin: 2%;
}

.close-button {
  font-size: 30px;
  font-weight: bold;

  text-align: right;
}

.expanded-page-container {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  position: absolute;
  top: 5%;
  background: $blue-Gradient;
  padding: 20px;
  margin-bottom: 30px;
}

.closeModal {
  display: none;
}

</style>

