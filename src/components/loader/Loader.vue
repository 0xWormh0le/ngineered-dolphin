<template>
  <div class="loader-container">
    Loading...
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  components: {}
})
export default class Loader extends Vue {}
</script>

<style scoped lang="scss">
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}
</style>
