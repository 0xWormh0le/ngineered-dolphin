<template>
    <div>
        <div class="brief-desc-container">
            <a :href="url"
               class="name-link"
               target="_blank">{{Company}}</a>
            <p id="position">{{Position}}</p>
            <p>{{location}} | {{status}}</p>
            <p>Working on: {{issue}}</p>
            <div class="buttons-wrapper">
               <div id="pass"
                         @click="pass(iD)">💩 p(ass)</div>
                    <div id="apply"
                         @click="apply(iD)">🎯 apply</div>
                    <div id="save"
                         @click="save(iD)">⭐️ save</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import suggestedJobsApi from '@/services/api/suggestedJobsApi.ts'
  import suggestedJobs from '@/store/modules/suggestedJobs.ts'
  import { getModule } from 'vuex-module-decorators'
  @Component({})
  export default class ExpandedJobContainer extends Vue {
    @Prop() Company: String
    @Prop() Position: String
    @Prop() iD: number
    @Prop() url: string
    @Prop() location: string
    @Prop() issue: string
    @Prop() status: string
    jobCards = getModule(suggestedJobs)

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
    closeModal() {
      this.$emit('closeModal')
    }

    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .name-link {
    color: darkblue;
    text-decoration: underline;
  }
  .brief-desc-container {
    border: 1px solid black;
    max-height: 200px;
    text-align: center;
    margin-bottom: 100px;
    margin-left: 50px;
    margin-right: 50px;
    padding-top: 15px;
    line-height: 25px;
  }
  .close-button {
    font-size: 35px;
    color: darkblue;
    font-weight: bold;
    position: absolute;
    right: 0;
    margin-right: 20px;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
  }

  #pass {
    border: 1px solid black;
    border-right: none;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    background: $jobCardYellow;
  }
  #save {
    border: 1px solid black;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    background: $jobCardGreen;
  }
  #apply {
    border: 1px solid black;
    border-right: none;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    background: $jobCardPink;
  }

  .buttons-wrapper {
    position: relative;
    top: 16px;
  }

  #position {
    font-family: $KronaHeaders;
    font-size: 22px;
    margin: 5px 40px 5px 40px;
  }

  @media screen and (max-width: 1180px) {
    .brief-desc-container {
      min-width: 700px;
    }

    #pass {
      padding-left: 30px;
      padding-right: 30px;
    }
    #save {
      padding-left: 30px;
      padding-right: 30px;
    }
    #apply {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  @media screen and (max-width: 900px) {
    .brief-desc-container {
      min-width: 500px;
    }
    #pass {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    #save {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    #apply {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .buttons-wrapper {
      position: relative;
      top: -8px;
    }
  }
  @media screen and (max-width: 650px) {
    .brief-desc-container {
      min-width: 350px;
      margin-left: 26px;
      margin-right: 30px;
    }
  }
</style>