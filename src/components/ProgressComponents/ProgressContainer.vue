<template>
  <div class="progress-content-container">
    <div class="progress-background">
      <div class="complete-percentage">{{ percentage }}%</div>
      <div class="complete-text">complete</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class ProgressContainer extends Vue {
  @Prop() currentStep: number;
  @Prop() stepsCount: number;

  get percentage() {
    if (this.currentStep < 2) {
      return 0;
    } else {
      return Math.round((this.currentStep / this.stepsCount) * 100);
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-content-container {
  z-index: -1; // Make the progress container to appear below card element
  position: absolute;
  top: -90px;
  left: 0;
  right: 0;

  .progress-background {
    margin: 0 auto;
    background: url('~@/assets/graphics/progress-background-star.png') no-repeat top center;
    width: 155px;
    height: 155px;
    text-align: center;
    line-height: 20px;

    .complete-percentage {
      padding-top: 40px;
      font-weight: bold;
    }
  }
}
</style>
