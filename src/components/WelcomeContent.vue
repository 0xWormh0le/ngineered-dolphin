<template>
    <div class="content-container">
        <p class="header">{{header}}</p>
        <div>
            <ul class="list">
                <li>{{listItem1}}</li>
                <li>{{listItem2}}</li>
                <li>{{listItem3}}</li>
                <li>{{listItem4}}</li>
                <li>{{listItem5}}</li>
                <li>{{listItem6}}</li>
                <li>{{listItem7}}</li>
                <li>{{listItem8}}</li>
                <li>{{listItem9}}</li>
                <li>{{listItem10}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  export default class WelcomeContent extends Vue {
    header = '💼 150,000+ jobs and internships:'
    listItem1 = '⛑ curing deadly diseases'
    listItem2 = '🌎 fighting climate change'
    listItem3 = '📚 improving education'
    listItem4 = '🏥 fixing healthcare'
    listItem5 = '🗽 protecting civil liberties'
    listItem6 = '👽 exploring space'
    listItem7 = '💸 reducing poverty'
    listItem8 = '🚗 reinventing mobility'
    listItem9 = '🍔 improving food'
    listItem10 = '🌐 securing the web'
  }
</script>

<style lang="scss" scoped>
  .content-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .list {
    font-family: 'Work Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    column-count: 2;
    column-gap: 20px;
    column-fill: auto;
    list-style-type: none;
  }

  .header {
    font-family: 'Krona One';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    width: 404px;
    height: 23px;
    margin-left: 31px;
    margin-top: 37px;
  }
</style>

