<template>
    <div class="issue-icon-container">
        <p class="issue-icon">{{iconGenerator(issue)}}</p>
        <div class="issue-text-container">
            <p class="issue-text">{{issue}}</p>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class IssueIcon extends Vue {
    @Prop() issue: string

    iconGenerator(issue) {
      switch (issue) {
        case 'climate change':
          return '🌎'
        case 'education':
          return '📚'
        case 'health':
          return '🏥'
        case 'financial empowerment':
          return '💸'
        case 'cities + mobility':
          return '🚗'
        case 'space':
          return '👽'
        case 'civil liberties':
          return '🗽'
        case 'future of food':
          return '🥩'
        case 'curing deadly diseases':
          return '😷'
        case 'cybersecurity':
          return '🌐'
        case 'disease prevention':
          return '😷'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .issue-icon-container {
    border: 1px solid $jobCardBlue;
    display: flex;
    text-align: center;
    padding-left: 4px;
    padding-right: 4px;
    max-height: 35px;
    width: fit-content;
    margin-bottom: 10px;
    margin-right: 5px;
    background: rgba(255, 255, 255, 0.2);
  }

  .issue-icon {
    font-size: 24px;
    margin-bottom: 0px;
  }
  .issue-text-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin-top: 15px;
  }
  .issue-text {
    font-size: 14px;
    text-align: start;
    margin-left: 3px;
    margin-right: 3px;
    color: $jobCardBlue;
    max-width: 120px;
    line-height: 12px;
  }
</style>