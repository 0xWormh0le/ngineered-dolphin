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
                <div class="buttons-container">
                    <div id="apply"
                         @click="apply(iD)">🎯 apply</div>
                    <div id="save"
                         @click="save(iD)">⭐️ save</div>
                </div>
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
  export default class ExpandedNotificationsContainer extends Vue {
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
    min-height: 60px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-self: center;
    min-width: 900px;
    margin-bottom: 100px;
    margin-left: 50px;
    margin-right: 50px;
    padding-top: 15px;
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
  }

  #pass {
    border: 1px solid black;
    border-right: none;
    padding: 15px;
    padding-left: 50px;
    padding-right: 50px;
    background: $jobCardYellow;
    max-height: 60px;
  }
  #save {
    border: 1px solid black;
    padding: 15px;
    padding-left: 50px;
    padding-right: 50px;
    background: $jobCardGreen;
    max-height: 60px;
  }
  #apply {
    border: 1px solid black;
    border-right: none;
    padding: 15px;
    padding-left: 50px;
    padding-right: 50px;
    background: $jobCardPink;
    max-height: 60px;
  }

  .buttons-wrapper {
    position: relative;
    top: 36px;
  }

  #position {
    font-family: $KronaHeaders;
    font-size: 18px;
  }
</style>