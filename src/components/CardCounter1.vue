<template>
    <div class="card-counter-container">
        <p class="text">{{issue}}</p>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class CardCounter1 extends Vue {
    @Prop() issue: string
  }
</script>

<style lang="scss" scoped>
  .card-counter-container {
    display: flex;
    border: 1px solid black;
    width: 200px;
    height: 50px;
    justify-content: center;
  }

  .text {
    font-family: $KronaHeaders;
    padding: 10px;
  }

  @keyframes slidemiddle {
    //start from outside of page
    from {
      margin-left: 500%;
    }

    to {
      margin-left: 0%;
    }
  }
</style>