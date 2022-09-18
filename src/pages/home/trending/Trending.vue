<template>
    <div class="trending-container">
        <nav-bar :style="{background: '#12198F'}" />
        <div class="body">
            <p id="heading">🔥 Trending</p>
            <div class="trending-content-container">
                <div v-if="waitingForData === false">
                    <div v-for="(pill, index) in groupedPills"
                         class="child-container"
                         :key="index">
                        <div class="marker">
                            <div class="marker-text-box"> {{changeDate(pill[0].createdAt)}}
                            </div>
                        </div>
                        <trending-pill v-for="(result, index) in pill"
                                       :key="index"
                                       class="trending-pill"
                                       v-bind:content="result.text"
                                       v-bind:emoji="result.icon"
                                       v-bind:id="result.job.id"
                                       @clicked="sendID(result.job.id)" />
                    </div>
                </div>
                <infinite-loader @infinite="infiniteHandler">
                </infinite-loader>
            </div>
            <div class="modal-container"
                 v-if="showModal == true">
                <trending-modal v-bind:CompanyID="jobPostingID"
                                @closeModal="showModal = false" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import NavBar from '@/components/MainNavBar.vue'
  import axios, { AxiosResponse } from 'axios'
  import TrendingPill from '@/components/TrendingComponents/TrendingPill.vue'
  import suggestedJobs from '@/store/modules/suggestedJobs.ts'
  import trendingStoriesApi from '@/services/api/trendingStoriesApi'
  import { getModule } from 'vuex-module-decorators'
  import Trending from '@/store/modules/trending'
  import moment from 'moment'
  import InfiniteLoading from 'vue-infinite-loading'
  import TrendingModal from '@/components/TrendingComponents/TrendingModal.vue'
  @Component({
    components: {
      'trending-pill': TrendingPill,
      'nav-bar': NavBar,
      'trending-modal': TrendingModal,
      'infinite-loader': InfiniteLoading
    }
  })
  export default class extends Vue {
    showModal = false
    jobPostingID: number = 0
    trendingModule = getModule(Trending)
    suggestedJobsModule = getModule(suggestedJobs)
    trendingPills: any = {}
    trendingPillsArray: any = []
    groupedPills = {}
    offset = 4
    waitingForData = true
    formatDate(date) {
      var d = new Date(date)
      return d.toDateString()
    }
    changeDate(date) {
      return moment(date).format('ddd, MMM Do')
    }
    groupPills(array) {
      return this.lodash.groupBy(array, 'createdAt')
    }
    async mounted() {
      this.trendingPills = await trendingStoriesApi.getTrendingStories()
      this.trendingPillsArray = await trendingStoriesApi.getTrendingStoriesArray()
      this.groupedPills = this.modifyData(this.trendingPills, this.trendingPills.results)
      this.waitingForData = false
    }
    //helper function. When user clicks on trending pill, current job ID will be sent to pop up modal so it knows what job info to display.
    sendID(id) {
      this.jobPostingID = id
      this.showModal = true
    }
    modifyData(obj, array) {
      array.forEach(e => {
        for (let key in e) {
          e['createdAt'] = this.formatDate(e['createdAt'])
        }
      })
      let groupedData = this.lodash.groupBy(obj.results, 'createdAt')
      console.log(groupedData)
      return groupedData
    }
    infiniteHandler($state) {
      axios
        .get(`/api/v1/trending-stories/?&expand=job,job.location,job.company`, { params: { offset: this.offset } })
        .then(resp => {
          let modifiedResponse = this.modifyData(resp.data, resp.data.results)
          if (resp.data.length != 0) {
            this.offset += 5
            if (resp.data.results?.length) {
              this.groupedPills = { ...this.groupedPills, ...modifiedResponse }
              $state.loaded()
            } else {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .modal-container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    padding-top: 50px;
    align-items: center;
    animation: fadein 0.3s;
    height: 100%;
    width: 100%;
  }
  .trending-pill {
    margin-top: 10px;
  }
  .marker-text-box {
    margin-left: 15px;
    margin-right: 15px;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .trending-container {
    background: $trendingGradient;
    height: 100%;
  }
  .marker {
    display: flex;
    border: 1px solid black;
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #dad3ff;
    position: sticky;
    top: 0;
    z-index: 99;
  }
  .child-container {
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loading-spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #heading {
    font-family: $KronaHeaders;
    margin-top: 35px;
    font-size: 24px;
  }
  .trending-content-container {
    border: 1px solid black;
    justify-content: center;
    min-width: 800px;
    max-height: 550px;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
  }
  @media screen and (max-width: 680px) {
    .trending-content-container {
      max-width: 500px;
      min-width: 500px;
    }
    .pill-content-container {
      max-width: 300px;
    }
  }
</style>