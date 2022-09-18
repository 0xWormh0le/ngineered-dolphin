<template>
    <div class="tracker-container">
        {{currentNum}}/{{totalNum}}
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class CardTracker extends Vue {
    @Prop() currentNum: Number
    @Prop() totalNum: Number
  }
</script>

<style lang="scss" scoped>
  .tracker-container {
    display: inline-block;
    border: 1px solid $jobCardBlue;
    color: $jobCardBlue;
    font-family: $KronaHeaders;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.2);
    padding: 5px;
  }
</style>