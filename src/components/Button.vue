<template>
    <div class="button-container"
         :style="style">
        <div class="bottom-button-div">
            {{label}}
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class Button extends Vue {
    @Prop() label: String

    get style() {
      if (this.label == 'Sign Up') {
        return 'background: #CCFFF9'
      } else if (this.label == 'Login') {
        return 'background: #FFCCF7'
      }
    }
  }
</script>

<style scoped lang="scss">
  .button-container {
    z-index: 0;
    margin-bottom: 20px;
    border: 1px solid black;
    background: pink;
    margin-right: 20px;
  }

  .bottom-button-div {
    border-style: solid;
    border-width: 1px;
    z-index: 2;
    left: 9px;
    bottom: 8px;
    background-color: white;
    position: relative;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
