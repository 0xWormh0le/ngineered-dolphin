<template>
    <div class="right-button-container">
        {{label}}
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class QuestionButtonRight extends Vue {
    @Prop() label: String
  }
</script>

<style lang="scss" scoped>
  .right-button-container {
    border-right-style: solid;
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
  }
</style>
