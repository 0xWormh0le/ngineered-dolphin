<template>
  <div class="card-container" :style="{ backgroundColor: bottomCardColor }">
    <div class="bottom-card-div">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class Card extends Vue {
  @Prop({ default: '#FFCCF7' }) bottomCardColor: string;
}
</script>

<style scoped lang="scss">
  .card-container {
    z-index: 0;
    border: 1px solid black;
    background: pink;
    max-width: 100%;
    margin-right: 8px;
    display: inline-block;
    margin-bottom: 30px;
  }

.bottom-card-div {
  border-style: solid;
  border-width: 1px;
  left: 9px;
  bottom: 8px;
  background-color: white;
  position: relative;
  display: inline-block
}
</style>
