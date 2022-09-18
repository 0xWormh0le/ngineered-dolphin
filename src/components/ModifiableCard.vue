<template>
    <div class="card-container">
        <div class="bottom-card-div">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  @Component({
    components: {}
  })
  export default class ModifiableCard extends Vue {
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .card-container {
    z-index: 0;
    border: 1px solid black;
    background:$navbar-blue;
    max-width: 100%;

    display: inline-block;
  }

  .bottom-card-div {
    border-style: solid;
    border-width: 1px;
    z-index: 2;
    left: 9px;
    bottom: 8px;
    background-color: $tan;
    position: relative;
    display: inline-block;
  }
</style>
