<template>
    <div class="card-counter-container">
        <p class="text">{{currentIndex+'/'+arrayLength}}</p>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class CardCounter extends Vue {
    @Prop() arrayLength: number
    @Prop() currentIndex: number
  }
</script>

<style lang="scss" scoped>
  .card-counter-container {
    display: flex;
    border: 1px solid black;
    border-radius: 40px/20px;
    width: 90px;
    height: 40px;
    justify-content: center;
  }

  .text {
    font-family: $KronaHeaders;
    margin-top: 4px;
  }
</style>