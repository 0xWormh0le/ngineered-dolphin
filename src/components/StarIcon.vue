<template>
    <div class="star-container">
        <img src="@/assets/graphics/star.svg" />
        <p class="emoji">🎉</p>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class StarIcon extends Vue {}
</script>

<style lang="scss" scoped>
  .star-container {
    position: relative;
    text-align: center;
  }

  .emoji {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
  }
</style>