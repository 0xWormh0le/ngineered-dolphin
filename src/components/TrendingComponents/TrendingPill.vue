<template>
    <div class="pill-container"
         @click="clicked">
        <div class="pill-content-container">
            <div class="emoji-container">
                <p class="hourglass-emoji">{{ emoji }}</p>
            </div>
            <div class="text-container">
                <p class="pill-text"
                   v-html="content"></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import suggestedJobs from '@/store/modules/suggestedJobs.ts'
  import { getModule } from 'vuex-module-decorators'
  @Component({
    components: {}
  })
  export default class TrendingPill extends Vue {
    @Prop() content: string
    @Prop() emoji: string
    @Prop() id: number
    suggestedJobsModule = getModule(suggestedJobs)

    clicked() {
      setTimeout(() => {
        this.suggestedJobsModule.recieveJobListingById(this.id), 4000
      })
      this.$emit('clicked')
    }
  }
</script>

<style lang="scss" scoped>
  .pill-container {
    border: 1px solid black;
    margin: 10px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    max-width: 500px;
    background: $notificationPillGradient;
  }

  .emoji-container {
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-container {
    width: 100%;
    position: relative;
    max-width: 390px;
    margin: 5px;
    margin-left: none;
  }

  .hourglass-emoji {
    font-size: 26px;
    margin-bottom: 0px;
  }

  .pill-content-container {
    min-width: 400px;
    min-height: 70px;
    position: relative;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }

  @media screen and (max-width: 680px) {
    .pill-content-container {
      max-width: 300px;
    }
  }
</style>