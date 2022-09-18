<template>
    <div class="left-button-container">
        {{label}}
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class QuestionButtonLeft extends Vue {
    @Prop() label: String
  }
</script>

<style lang="scss" scoped>
  .left-button-container {
    border-left-style: solid;
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
</style>
