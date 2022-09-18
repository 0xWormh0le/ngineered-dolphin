<template>
    <div class="pass-card-container">
        <div class="level-one">
            <p class="pass-headers">Our bad!</p>
            <img id="bullseye"
                 src="@/assets/graphics/bullseye.svg" />
            <p class="pass-headers">Why did you pass?</p>
            <p>Your feedback helps us find more relevant jobs for you.</p>
        </div>
        <div class="buttons">
            <button class="pass-buttons"
                    id="level-two">
                meh job title
            </button>
            <button class="pass-buttons"
                    id="level-three">
                meh company
            </button>
            <button class="pass-buttons"
                    id="level-four">
                other
            </button>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  export default class PassCard extends Vue {}
</script>
<style scoped lang="scss">
  .pass-card-container {
    background: #e7ffe7;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  #bullseye {
    margin-bottom: 20px;
    margin-top: 20px;
    height: 80px;
  }
  .pass-headers {
    font-family: $KronaHeaders;
    font-size: 18px;
    line-height: 22px;
  }

  #level-two {
    border-top: 1px solid black;
    background: $passCardBlue;
  }
  #level-three {
    border-top: 1px solid black;
    background: $passCardPurple;
  }

  #level-four {
    border-top: 1px solid black;
    background: $passCardPink;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }

  .pass-buttons {
    border: none;
    padding: 10px;
  }

  .level-one {
    background: $passCardPink;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 10px;
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