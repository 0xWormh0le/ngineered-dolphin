<template>
    <transition name="fade"
                mode="out-in">
        <router-view />
    </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  @Component({
    components: {}
  })
  export default class AuthLayout extends Vue {}
</script>

<style scoped lang="scss"></style>
