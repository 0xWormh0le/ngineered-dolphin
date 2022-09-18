<template>
    <div class="saved-card-container">
        <div class="content-container">
            <p class="saved-header">saved</p>
            <p class="saved-header-description">come back to this job in the faves tab. for most jobs, the earlier you apply the better your chances.</p>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  export default class SavedCard extends Vue {
    @Prop() CompanyName: String
    @Prop() PositionTitle: String
  }
</script>
<style scoped lang="scss">
  .saved-card-container {
    background: #e7ffe7;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .content-container {
    padding-left: 15px;
    min-width: 250px;
    padding-right: 15px;
    padding-top: 140px;
    padding-bottom: 140px;
  }

  .saved-header {
    font-family: $KronaHeaders;
    font-size: 18px;
    line-height: 37px;
  }

  .saved-header-description {
    font-size: 14px;
    line-height: 18px;
  }
</style>