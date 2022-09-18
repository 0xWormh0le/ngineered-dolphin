<template>
  <div class="card-container">
    <div class="top-card-div">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class JobCard extends Vue {
  @Prop() color!: string;
}
</script>

<style scoped lang="scss">
.top-card-div {
  width: 90%;
  border: 1px solid black;
  border-radius: 60px;
  display: inline-block;

  background: $yellow-Gradient;

  margin: 4% auto;
  padding-top: 2%;
}

@media screen and (max-width: 576px) {
  .top-card-div {
    width: 130%;
    margin: 4% -14%;
  }
}
</style>