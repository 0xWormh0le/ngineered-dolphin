<template>
    <div class="l-container">
        <transition name="fade"
                    mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script lang="ts">
  // @ is an alias to /src
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { mapState } from 'vuex'
  import { getModule } from 'vuex-module-decorators'
  import store from './../store/store'
  import TrendingPill from '@/components/TrendingComponents/TrendingPill.vue'

  import JobCard from '@/components/JobCard.vue'
  import MainCard from '@/components/JobCardContent/MainCard.vue'

  @Component({
    components: {
      MainCard,
      TrendingPill,

      JobCard
    }
  })
  export default class MainLayout extends Vue {}
</script>
<style scoped lang="scss">
  .l-container {
    height: 100%;
    display: grid;
  }
</style>
