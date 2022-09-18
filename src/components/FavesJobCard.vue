<template>
    <div class="card-container">
        <div class="top-card-div"
             :style="{ backgroundColor: color }">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class FavesJobCard extends Vue {
    @Prop() color!: string
  }
</script>

<style scoped lang="scss">
  .card-container {
    z-index: 0;
    border: 1px solid black;
    background: $dark-yellow;
    display: inline-block;
    margin:5%;
  }

  .top-card-div {
    width: 100%;
    border-style: solid;
    border-width: 1px;
    z-index: 2;
    left: 9px;
    bottom: 8px;
    position: relative;
    display: inline-block;
   width:375px;
  }


  a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
  color: inherit;
}


</style>