<template>
  <div class="card-container">
    <div class="top-card-div" :style="{ backgroundColor: color }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class JobCard extends Vue {
  @Prop() color!: string
}
</script>

<style scoped lang="scss">
.card-container {
  z-index: 0;
  margin-bottom: 20px;
  border: 1px solid black;
  background: $jobCardBlue;
  margin-right: 8px;
  display: inline-block;
  margin-top: 30px;
}

.top-card-div {
  width: 100%;
  border-style: solid;
  border-width: 1px;
  z-index: 2;
  left: 9px;
  bottom: 8px;
  position: relative;
  display: inline-block;
  min-width: 430px;
  max-width: 430px;
  height: 530px;
}
@media screen and (max-width: 1180px) {
  .top-card-div {
    min-width: 430px;
    max-width: 430px;
  }
}
</style>
