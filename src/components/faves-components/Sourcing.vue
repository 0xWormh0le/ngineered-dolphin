<template>
    <b-container>
        <div class="text-content">
            <div id="text-holder">
                <p>got badass friends? refer them to the companies below and get paid if they get hired: </p>
                <p>💰a quick text can earn you thousands of dollars. </p>
                <p>💛 your friend is forever grateful to you for finding them an awesome job. </p>
                <p>🌞 help a mission-driven company get one step closer to changing the world. </p>
            </div>
        </div>

        <div class="job-content">
            <b-row>
                <b-col sm="6"
                       v-for="(job, $index ) in jobList.results"
                       v-bind:key="$index">

                    <JobCard color='#D5FFDE'>
                        <a :href='job.company.url'>
                            <h6> {{job.title}}</h6>
                            <p class="info">{{job.company.name}}

                                <span v-if="job.isActive === false">| Expired </span>

                                <span v-else> <span v-if="job.isReferralEnabled">
                                        | ${{job.referringUserRewardUsd}} Reward</span>
                                </span>
                            </p>
                        </a>
                    </JobCard>
             
                </b-col>
 <infinite-loading 
            
                          @infinite="infiniteHandler"
                          force-use-infinite-wrapper="job-content">
        </infinite-loading>
            </b-row>

        </div>
       
    </b-container>

</template> 


<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import NavBar from '@/components/MainNavBar.vue'
  import JobCard from '@/components/JobCard.vue'
  import usersApi from '../../services/api/usersApi'
  import { favesJobs } from '../../interfaces/favesInfo.interface'
  import { Prop } from 'vue-property-decorator'
  import InfiniteLoading from 'vue-infinite-loading'
  import axios, { AxiosResponse } from 'axios'

  @Component({
    components: {
      NavBar: NavBar,
      JobCard: JobCard,
      InfiniteLoading: InfiniteLoading
    }
  })
  export default class Sourcing extends Vue {
    offset = 4

    jobList: { results: favesJobs[] } = {} as { results: favesJobs[] }



    //list: { results: favesJobs[] } = {} as { results: favesJobs[] }

    infiniteHandler($state){
    
      return axios
        .get(`/api/v1/promoted-jobs/?status=3&limit=10&expand=company`, {
          params: {
            offset: this.offset
          }
        })
        .then((resp: { data }) => {
        
          if (resp.data.count) {
            this.offset += 4
            if(resp.data.results?.length){
              if (this.jobList.results){
              this.jobList.results = [ ...this.jobList.results, ...resp.data.results ]
             
              }
              
            } else{
                 $state.complete()
            }
            $state.loaded()
          
          } else {
           
            $state.complete()
            
          
         
          }
        })
    }

    async mounted() {
      this.jobList = await usersApi.getJobsSourced()
    }
  }
</script>


<style lang="scss" scoped>
  .text-content {
    max-width: 800px;
    margin: 5%;
    border: 1px solid black;
    text-align: left;
    font-style: normal;
  }

  .job-content {
    margin: auto;
    text-align: center;
  }

  .card-container {
    text-align: left;
    background: $dark-green;
    margin-bottom: 5%;
  }

  p {
    font-size: 20px;
    line-height: 23px;
  }
  #text-holder {
    margin: 5%;
  }
  h6 {
    margin-right: 2%;
    margin-left: 2%;
    font-weight: 800;
    margin-top: 4%;
  }
  .col-lg-6 {
    margin-bottom: 20px;
  }
  .info {
    font-size: 16px;
    margin-left: 2%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: none;
    color: inherit;
  }

  @media screen and (max-width: 576px) {
    p {
      font-size: 15px;
    }

    h6 {
      font-size: 15px;
    }
  }
</style>
