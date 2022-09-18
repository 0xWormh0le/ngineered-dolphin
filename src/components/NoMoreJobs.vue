<template>
    <div class="no-more-jobs-container">
        <star-iconz />
        <p>Congrats! You're done for the day.</p>
        <p>The next batch of jobs drops in:</p>
        <!-- NOTE: startTime, endTime, and currentTime must be epoch unix. Hence, Date.parse(this.jobSuggestionsDt) -->
        <count-down :currentTime="currentTime"
                    :startTime="currentTime"
                    :endTime="Date.parse(this.jobSuggestionsDt)"
                    :dayTxt="'d '"
                    :hourTxt="'h '"
                    :minutesTxt="'m '"
                    :secondsTxt="'s '"></count-down>
        <p>Stand out to companies by answering some fun questions (our recruiter provides feedback on ones you publish)</p>
        <div class="start-button-container">
            <start-button class="start-button"
                          label="start q&a" />
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { getModule } from 'vuex-module-decorators'
  import suggestedJobs from '@/store/modules/suggestedJobs'
  import suggestedJobsApi from '@/services/api/suggestedJobsApi'
  import StarIcon from '@/components/StarIcon.vue'
  import Button from '@/components/Button.vue'
  import CountDown from 'vue2-countdown'
  @Component({
    components: {
      'star-iconz': StarIcon,
      'start-button': Button,
      'count-down': CountDown
    }
  })
  export default class NoMoreJobs extends Vue {
    suggestedJobsModule = getModule(suggestedJobs)
    currentTime: number = 0
    jobSuggestionDate: number = 0
    jobSuggestionsDt: string = ''

    async mounted() {
      this.suggestedJobsModule.recievejobDates
      this.jobSuggestionsDt = await suggestedJobsApi.getSuggestedJobsDate()
      this.currentTime = new Date().getTime()
    }
  }
</script>

<style lang="scss" scoped>
  .no-more-jobs-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    max-width: 395px;
    align-items: center;
    padding: 15px;
  }
</style>